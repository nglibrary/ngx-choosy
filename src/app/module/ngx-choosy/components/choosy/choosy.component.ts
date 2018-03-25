import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ElementRef,
  HostBinding,
  ChangeDetectionStrategy,
  InjectionToken,
  Inject,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChange,
  OnChanges,
  OnDestroy
} from '@angular/core';

import { ChoosyConfig, ChoosyOption } from '../../models';
import { ChoosyConfigService } from '../../services/choosy-config.service';
import { ChoosyListService } from '../../services/choosy-list.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/observable/fromEvent';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const keyCodes = {
  '38': 'UP',
  '40': 'DOWN',
  '13': 'ENTER'
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy',
  templateUrl: './choosy.component.html',
  preserveWhitespaces: false,
  exportAs: 'choosyRef',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./choosy.style.scss'],
  providers: [ChoosyListService]
})
export class ChoosyComponent implements OnInit, OnChanges, OnDestroy {
  instanceID = null;
  initialized = new Subject<any>();
  initialOptions: Observable<any>;
  @Input() config: Partial<ChoosyConfig> = {};
  @Input()
  set options(opt) {
    this.config = this.configService.mergeWithDefault(this.config);
    if (opt instanceof Observable) {
      this.listService.setOptionsFromObservable(opt, this.config);
    } else if (Array.isArray(opt)) {
      this.listService.setOptions(opt, this.config);
    } else {
      throw new Error('Invalid options');
    }
    this.initialOptions = this.listService.getOptions();
  }
  @Input() optionTpl: TemplateRef<any>;
  @Output() events: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Input() autocomplete;

  @HostBinding('attr.data-instance-id') instanceIDAttr: string;
  @HostBinding('attr.class') classNameAttr: string;

  keypressSub: Subject<any> = new Subject();
  autocompleteSub: Subject<any> = new Subject();

  optionsLoading = true;

  constructor(
    public listService: ChoosyListService,
    private configService: ChoosyConfigService,
    public elRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.instanceIDAttr = this.instanceID;
    this.classNameAttr = this.config.theme;
    this.listService.setName(this.instanceID);
    this.initialized.next(true);
    this.listService.getSelectedOptions().subscribe(x => {
      this.selected.emit(x);
    });
    this.listService.events.subscribe(e => this.events.emit(e));
    this.listService.isLoading().subscribe(x => {
      this.optionsLoading = x;
      this.cdRef.detectChanges();
    });
    Observable.fromEvent(this.elRef.nativeElement, 'keydown')
      .map((x: KeyboardEvent) => x.keyCode)
      .map(x => keyCodes[x])
      .filter(x => x !== undefined)
      .subscribe(x => this.keypressSub.next(x));
    this.activeOption();
    this.autocompleteSub
      .do(x => {
        this.optionsLoading = true;
      })
      .debounceTime(500)
      .switchMap(x => this.autocomplete(x))
      .subscribe((z: any) => {
        this.listService.setOptions(z, this.config);
        this.optionsLoading = false;
      });

    this.updateClassName();
  }

  onSearch(keyword) {
    if (keyword instanceof Event) {
      keyword = (keyword.target as HTMLInputElement).value;
    }
    this.listService.filterOptions(keyword, this.config.search);
  }
  fetch(q) {
    if (q.length < this.config.autocomplete.minChars) {
      return;
    }
    this.autocompleteSub.next(q);
  }

  updateConfig(newConfig) {
    this.config = this.configService.mergeAllWithDefault(this.config, newConfig);
    this.listService.updateSettings(this.config);
    this.updateClassName();
  }

  ngOnChanges(change: any) {
    if (change.config) {
      this.updateConfig(change.config.currentValue);
    }
  }

  activeOption() {
    this.keypressSub
      .asObservable()
      .do(x => {
        if (x === 'UP') {
          this.listService.markPreviousAsActive();
        } else if (x === 'DOWN') {
          this.listService.markNextAsActive();
        } else if (x === 'ENTER') {
          this.listService.selectActiveOption();
        }
      })
      .filter(x => x !== 'ENTER')
      .subscribe(a => {
        this.elRef.nativeElement.querySelector('choosy-list>div.active').scrollIntoView(false);
      });
  }

  updateClassName() {
    const features = [
      this.config.theme,
      this.config.footer.enable ? 'choosy-has-footer' : 'choosy-no-footer',
      this.config.search.enable ? 'choosy-has-search' : 'choosy-no-search',
      this.config.multiselect.checkbox ? 'choosy-has-checkbox' : 'choosy-no-checkbox'
    ];

    this.classNameAttr = features.join(' ');
  }

  ngOnDestroy() {}
}
