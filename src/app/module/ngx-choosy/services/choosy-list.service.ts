import { Injectable } from '@angular/core';
import { ChoosyOption, ChoosyOptions, ChoosyEvent } from '../models';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChoosySearchService } from './choosy-search.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { share } from 'rxjs/operators';

@Injectable()
export class ChoosyListService {
  optionsSub: BehaviorSubject<ChoosyOptions> = new BehaviorSubject([]);
  settings: any = {
    type: 'select'
  };
  selectedOptionsBucket: ChoosyOptions = [];
  // TODO:change name typeto ChoosyEvent
  events: Subject<{ name: any; value: any }> = new Subject();
  c = '';
  optionsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private latestFilteredOptions: ChoosyOptions = [];
  constructor(private searchService: ChoosySearchService) {}

  selectOption(option: ChoosyOption): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      if (this.settings.type !== 'multi-select') {
        o.state.selected = false;
      }
      if (o.uid === option.uid) {
        o.state.selected = true;
        this.selectedOptionsBucket.push(option);
      }
      return o;
    });
    console.log('select option', option);
    this.optionsSub.next(opts);
    this.events.next({
      name: 'optionSelected',
      value: option.value
    });
  }
  addOptions(options: any | any[]): void {
    if (!Array.isArray(options)) {
      options = [options];
    }
    options = this.mapMetaData(options);
    const opts = this.optionsSub.getValue().concat(options as any);
    this.optionsSub.next(opts);
    this.events.next({ name: 'optionsAdded', value: options });
  }
  removeOption(fn: (option: any) => boolean): void {
    let removedOpt = null;
    const opts = this.optionsSub.getValue().filter((o: ChoosyOption) => {
      const condition = !fn(o.value);
      if (!condition) {
        removedOpt = o;
      }
      return condition;
    });
    this.optionsSub.next(opts);
    this.events.next({ name: 'optionRemoved', value: removedOpt });
  }
  disableOption(fn: (option: any) => boolean): void {
    let disabledOpt = null;
    const opts = this.optionsSub.getValue().filter((o: ChoosyOption) => {
      o.state.disabled = fn(o.value);
      disabledOpt = o;
      return o;
    });
    this.optionsSub.next(opts);
    this.events.next({ name: 'optionDisabled', value: disabledOpt });
  }
  setOptionAsSelected(cbOrStr: ((option: any) => boolean) | string): void {
    let setOpt = null;
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      o.state.selected = false;
      if (typeof cbOrStr === 'function' && cbOrStr(o.value)) {
        o.state.selected = true;
        setOpt = o;
      } else if (typeof cbOrStr === 'string' && cbOrStr === o.value) {
        o.state.selected = true;
        setOpt = o;
      }
      return o;
    });
    this.optionsSub.next(opts);
    this.events.next({ name: 'optionSet', value: setOpt });
  }
  clearDisabledOption(option: any): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      if (o.uid === option.uid) {
        o.state.disabled = false;
      }
      return o;
    });
    this.optionsSub.next(opts);
    this.events.next({ name: 'optionEnabled', value: option });
  }
  clearAllDisabledOptions(): void {
    const opts = this.optionsSub.getValue().map(o => {
      o.state.disabled = false;
      return o;
    });
    this.optionsSub.next(opts);
    this.events.next({ name: 'optionsEnabled', value: null });
  }
  clearSelectedOption(option: any): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      if (o.uid === option.uid) {
        o.state.selected = false;
      }
      return o;
    });
    this.optionsSub.next(opts);
    this.events.next({ name: 'clearedSelectedOptions', value: option });
  }
  clearAllSelectedOptions(): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      o.state.selected = false;
      return o;
    });
    this.optionsSub.next(opts);
    this.events.next({ name: 'clearedAllSelectedOptions', value: null });
  }
  getAllSelectedOptions(): any {
    return this.optionsSub;
  }
  setOptions(options: ChoosyOptions, settings: any): void {
    this.settings = settings;
    options = this.mapMetaData(options);
    this.optionsSub.next(options);
    this.optionsLoading.next(false);
  }
  setOptionsFromObservable(optionsObs: Observable<any>, settings: any): void {
    this.optionsLoading.next(true);
    this.settings = settings;
    optionsObs.map(x => this.mapMetaData(x)).subscribe(x => {
      this.optionsSub.next(x);
      this.optionsLoading.next(false);
    });
  }
  updateSettings(settings: any) {
    this.settings = settings;
    this.events.next({ name: 'configUpdated', value: this.settings });
  }
  // TODO
  // when filter is active (has filtered items) , other actions like add, remove.. should be in sync with filtered items
  filterOptions(keyword: string, config = { keys: ['value'] }): void {
    const collection = this.optionsSub.getValue();
    if (this.latestFilteredOptions.length === 0) {
      this.latestFilteredOptions = collection;
    }

    this.searchService.search(this.latestFilteredOptions, keyword, config).then(res => {
      const nxt = keyword.length === 0 && res.length === 0 ? this.latestFilteredOptions : res;
      this.optionsSub.next(nxt);
      this.events.next({ name: 'optionsFiltered', value: res });
    });
  }
  clearFilteredOptions() {
    this.optionsSub.next(this.latestFilteredOptions);
    this.events.next({ name: 'clearFilteredOptions', value: this.latestFilteredOptions });
  }
  mapMetaData(options: any[]): ChoosyOptions {
    return options.map(this.metaData.bind(this));
  }

  isLoading() {
    return this.optionsLoading.asObservable().pipe(share());
  }
  private metaData(option): ChoosyOption {
    return {
      uid: this.generateUID(),
      state: {
        disabled: false,
        selected: false,
        hidden: false
      },
      value: !option || (typeof option === 'object' && Object.keys(option).length === 0) ? '-' : option
    };
  }

  setName(name) {
    if (!this.c) {
      this.c = name;
    }
  }

  getName() {
    return this.c;
  }

  ngOnDestroy() {
    console.log('dstroy servic');
    this.selectedOptionsBucket = [];
  }

  private generateUID(length = 36): string {
    return Math.random()
      .toString(length)
      .substr(2, 6);
  }
}
