import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import * as merge from 'deepmerge';
// import * as FuseSearch from 'fuse.js';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import {
  ChoosyConfig,
  ChoosyDropdownExpose,
  ChoosyFooterType,
  ChoosyNotification,
  ChoosyOption,
  ChoosyRawOption
} from './../../interfaces';
import { ChoosyConfigService } from './../../services/choosy-config/choosy-config.service';
import * as C from './../../utils/constants';
import { formatRawOption } from './../../utils/helpers';

export async function fus() {
  const fuse = await import(/* webpackChunkName: "fusejs" */ 'fuse.js');
  console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
  return fuse;
}

@Component({
  selector: 'choosy-results',
  templateUrl: './choosy-results.component.html',
  styleUrls: ['./choosy-results.component.scss']
})
export class ChoosyResultsComponent implements OnInit, OnDestroy {
  @Output() choosy = new EventEmitter<any>();

  @Input() config: ChoosyConfig = {};
  @Input() options: Array<ChoosyRawOption>;
  @Input()
  set template(template: TemplateRef<any>) {
    this.optionTpl = template;
    this.cdRef.detectChanges();
  }

  originalOptions: Array<ChoosyOption> = [];
  processedOptions: Array<ChoosyOption> = [];
  selections = new Subject<ChoosyRawOption>();
  footerType: ChoosyFooterType;
  optionTpl: TemplateRef<any>;
  isOpen = false;
  notifications = new BehaviorSubject<ChoosyNotification>({
    action: 'Initated',
    value: null
  });

  private results = new Subject<Array<ChoosyOption>>();
  private resultsSubscription: Subscription;
  private fuseSearch;
  constructor(
    public elRef: ElementRef,
    private configService: ChoosyConfigService,
    private cdRef: ChangeDetectorRef
  ) {
    console.log('cmp->config', this.config);
    console.log('cmp', configService);
    this.config = this.configService.getLocalConfig(this.config);
  }

  ngOnInit(): void {
    console.log('cmp===>', this.configService.getLocalConfig(this.config));
  }
}
