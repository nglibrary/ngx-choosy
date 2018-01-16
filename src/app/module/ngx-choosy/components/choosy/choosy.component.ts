import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ElementRef,
  HostBinding,
  ChangeDetectionStrategy,
  InjectionToken,
  Inject
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
  optionsSub = new BehaviorSubject([]);
  instanceID = null;
  initialized = new Subject<any>();
  private initialOptions = [];
  @Input() config: Partial<ChoosyConfig> = {};
  @Input()
  set options(opt) {
    if (opt) {
      this.initialOptions = this.listService.mapMetaData(opt);
      this.optionsSub.next(this.initialOptions);
    }
  }
  @Input() optionTpl: TemplateRef<any>;

  @HostBinding('attr.data-instance-id') instanceIDAttr: string;
  @HostBinding('style.height') height: string;

  constructor(
    public listService: ChoosyListService,
    private configService: ChoosyConfigService,
    public elRef: ElementRef
  ) { }
  ngOnInit() {
    this.instanceIDAttr = this.instanceID;
    this.config = this.configService.mergeWithDefault(this.config);
    this.height = this.config.dropdown.height + 'px';
    this.listService.setOptionsSub(this.optionsSub);
    this.optionsSub.subscribe(temp => { });
    this.listService.events.subscribe(e => { });
    this.listService.setName(this.instanceID);
    this.initialized.next(true);
    console.log('token ==>', this.instanceID, this.listService.getName());
  }

  onSearch(keyword) {
    if (keyword instanceof Event) {
      keyword = (keyword.target as HTMLInputElement).value;
    }
    this.listService.filterOptions(keyword);
  }
}
