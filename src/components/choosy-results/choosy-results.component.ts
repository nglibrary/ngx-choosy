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
import * as FuseSearch from 'fuse.js';
import 'rxjs/add/operator/map';
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

  private results = new Subject<Array<ChoosyOption>>();
  private notifications = new Subject<ChoosyNotification>();
  private resultsSubscription: Subscription;
  private fuseSearch: FuseSearch;
  constructor(
    public elRef: ElementRef,
    private configService: ChoosyConfigService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.options) throw new Error(C.MSG_NO_OPTIONS);
    if (!Array.isArray(this.options)) throw new Error(C.ERR_INVALID_OPTIONS);
    this.config = this.configService.getConfig(this.config);
    this.originalOptions = this.options
      .map((option: ChoosyRawOption): ChoosyOption => formatRawOption(option));
    this.resultsSubscription = this.results.subscribe((options: any) => {
      this.originalOptions = this.processedOptions = options;
      this.notifications.next({ action: C.OPTIONS_REFRESHED, value: this.originalOptions });
    });
    this.results.next(this.originalOptions);
    this.choosy.emit(this.expose());
  }

  ngOnDestroy(): void {
    if (this.resultsSubscription)
      this.resultsSubscription.unsubscribe();
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.processedOptions = merge([], this.originalOptions);
    this.footerType = { type: C.FOOTER_DEFAULT, data: this.processedOptions.length };
    this.notifications.next({ action: C.DROPDOWN_OPENED, value: null });
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.notifications.next({ action: C.DROPDOWN_CLOSED, value: null });
  }

  toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }

  optionSelectionListener(res: { event: Event, option: ChoosyOption }): void {
    this.optionClicked(res.event);
    this.selectOption(res.option.value);
  }

  selectOption(option: ChoosyRawOption): void {
    this.processedOptions = this.originalOptions.map((o: ChoosyOption) => {
      o.props.selected = false;
      if (o.value === option) o.props.selected = true;
      return o;
    });
    this.results.next(this.processedOptions);
    this.selections.next(option);
    this.notifications.next({ action: C.OPTION_SELECTED, value: option });
  }

  disableOption(fn: (option: ChoosyRawOption) => boolean): void {
    this.processedOptions = this.originalOptions.filter((o: ChoosyOption) => {
      o.props.disabled = fn(o.value);
      return o;
    });
    this.results.next(this.processedOptions);
    this.notifications.next({ action: C.OPTION_DISABLED, value: null });
  }

  clearDisabledOption(option: ChoosyRawOption): void {
    this.processedOptions = this.processedOptions.map((o: ChoosyOption) => {
      if (o.value === option)
        o.props.disabled = false;
      return o;
    });
    this.results.next(this.processedOptions);
    this.notifications.next({ action: C.CLEARED_DISABLED_OPTION, value: option });
  }

  clearDisabledOptions(): void {
    this.processedOptions = this.processedOptions.map(o => {
      o.props.disabled = false;
      return o;
    });
    this.results.next(this.processedOptions);
    this.notifications.next({ action: C.CLEARED_DISABLED_OPTIONS, value: null });
  }

  addOption(options: ChoosyRawOption | Array<ChoosyRawOption>): void {
    if (!Array.isArray(options)) options = [options];
    options = (options as Array<ChoosyRawOption>).map(option => formatRawOption(option));
    this.originalOptions = this.originalOptions.concat((options as any));
    this.results.next(this.originalOptions);
    this.notifications.next({ action: C.NEW_OPTION_ADDED, value: options });
  }

  removeOption(fn: (option: ChoosyRawOption) => boolean): void {
    this.originalOptions = this.originalOptions.filter((o: ChoosyOption) => !fn(o.value));
    this.results.next(this.originalOptions);
    this.notifications.next({ action: C.OPTION_REMOVED, value: null });
  }

  filterOptions(keyword: string): void {
    this.fuseSearch = new FuseSearch(this.originalOptions, this.config.search);
    this.processedOptions = (keyword.length > 0)
      ? (this.fuseSearch.search(keyword) as Array<ChoosyOption>)
      : merge([], this.originalOptions);
    this.footerType = { type: C.FOOTER_FILTER, data: this.processedOptions.length };
    this.notifications.next({ action: C.OPTION_FILTERED, value: keyword });
  }

  clearSelectedOption(option: ChoosyRawOption): void {
    this.processedOptions = this.processedOptions.map((o: ChoosyOption) => {
      if (o.value === option)
        o.props.selected = false;
      return o;
    });
    this.results.next(this.processedOptions);
    this.notifications.next({ action: C.SELECTED_OPTION_CLEARED, value: option });
  }

  clearSelectedOptions(): void {
    this.processedOptions = this.processedOptions.map((o: ChoosyOption) => {
      o.props.selected = false;
      return o;
    });
    this.results.next(this.processedOptions);
    this.notifications.next({ action: C.SELECTED_OPTIONS_CLEARED, value: null });
  }

  optionClicked(event: Event): void {
    this.notifications.next({ action: C.OPTION_CLICKED, value: event });
  }

  getSelectedOptions(): Array<ChoosyRawOption> {
    return this.processedOptions
      .filter((o: ChoosyOption) => o.props.selected)
      .map((o: ChoosyOption) => o.value);
  }

  reloadOptions(options: Array<ChoosyRawOption>): void {
    const newOptions = options.map(option => formatRawOption(option));
    this.originalOptions = newOptions;
    this.results.next(this.originalOptions);
    this.notifications.next({ action: C.OPTIONS_RELOADED, value: options });
  }

  updateConfig(config: {}): void {
    this.config = merge(this.config, config);
  }

  resetOptions(): void {
    this.processedOptions = this.originalOptions = this.options
      .map((option: ChoosyRawOption): ChoosyOption => formatRawOption(option));
    this.results.next(this.originalOptions);
    this.notifications.next({ action: C.OPTIONS_RESET, value: null });
  }

  expose(): ChoosyDropdownExpose {
    return {
      actions: {
        open: this.open.bind(this),
        close: this.close.bind(this),
        toggle: this.toggle.bind(this),
        updateConfig: this.updateConfig.bind(this),
        addOption: this.addOption.bind(this),
        removeOption: this.removeOption.bind(this),
        selectOption: this.selectOption.bind(this),
        disableOption: this.disableOption.bind(this),
        clearDisabledOption: this.clearDisabledOption.bind(this),
        clearDisabledOptions: this.clearDisabledOptions.bind(this),
        clearSelectedOption: this.clearSelectedOption.bind(this),
        clearSelectedOptions: this.clearSelectedOptions.bind(this),
        resetOptions: this.resetOptions.bind(this),
        getSelectedOptions: this.getSelectedOptions.bind(this),
        reloadOptions: this.reloadOptions.bind(this)
      },
      notifications: this.notifications,
      selections: this.selections
    };
  }
}
