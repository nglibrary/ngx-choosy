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

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/filter';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
    this.initialOptions = this.listService.optionsSub;
  }
  @Input() optionTpl: TemplateRef<any>;
  @Output() events: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();

  @HostBinding('attr.data-instance-id') instanceIDAttr: string;
  @HostBinding('attr.class') classNameAttr: string;

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
  }

  onSearch(keyword) {
    if (keyword instanceof Event) {
      keyword = (keyword.target as HTMLInputElement).value;
    }
    this.listService.filterOptions(keyword, this.config.search);
  }
  ngOnDestroy() {
    console.log('____ choosy is dead!_____');
  }
}
