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
  ChangeDetectorRef
} from '@angular/core';

import { ChoosyConfig, ChoosyOption } from '../../models';
import { ChoosyConfigService } from '../../services/choosy-config.service';
import { ChoosyListService } from '../../services/choosy-list.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/filter';
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
export class ChoosyComponent implements OnInit {
  instanceID = null;
  initialized = new Subject<any>();
  initialOptions: Observable<any>;
  @Input() config: Partial<ChoosyConfig> = {};
  @Input()
  set options(opt) {
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

  @HostBinding('attr.data-instance-id') instanceIDAttr: string;
  @HostBinding('attr.class') classNameAttr: string;

  keypressSub: Subject<any> = new Subject();

  optionsLoading = true;

  constructor(
    public listService: ChoosyListService,
    private configService: ChoosyConfigService,
    public elRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.instanceIDAttr = this.instanceID;
    this.config = this.configService.mergeWithDefault(this.config);
    this.classNameAttr = this.config.theme;
    this.listService.setName(this.instanceID);
    this.initialized.next(true);
    console.log('token ==>', this.instanceID, this.listService.getName());
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
  }

  onSearch(keyword) {
    if (keyword instanceof Event) {
      keyword = (keyword.target as HTMLInputElement).value;
    }
    this.listService.filterOptions(keyword, this.config.search);
  }

  activeOption() {
    console.log('el', this.elRef.nativeElement);

    this.keypressSub
      .asObservable()
      .do(x => {
        console.log('====>0', x);
        if (x === 'UP') {
          this.listService.markPreviousAsActive();
        } else if (x == 'DOWN') {
          this.listService.markNextAsActive();
        } else if (x == 'ENTER') {
          this.listService.selectActiveOption();
        }
      })
      .subscribe(a => {
        // console.log('keypressed', a, this.elRef.nativeElement.querySelectorAll('choosy-list>div'));
        this.elRef.nativeElement.querySelector('choosy-list>div.active').scrollIntoView(false);
      });
    // https://codereview.stackexchange.com/questions/132397/prev-next-buttons-for-a-circular-list
  }

  ngOnDestroy() {
    console.log('____ choosy is dead!_____');
  }
}
