import { Injectable, OnDestroy } from '@angular/core';
import { ChoosyOption, ChoosyOptions, ChoosyEvent, FilterInput, ChoosyConfig, ChoosySearch } from '../models';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SearchService } from './search.service';
import { Observable } from 'rxjs/Observable';
import { share, map } from 'rxjs/operators';

@Injectable()
export class OptionsService implements OnDestroy {
  optionsSub: BehaviorSubject<ChoosyOptions> = new BehaviorSubject([]);
  settings: Partial<ChoosyConfig> = {
    type: 'select'
  };
  selectedOptionsBucket: ChoosyOptions = [];
  // TODO:change name typeto ChoosyEvent
  events: Subject<{ name: any; value: any }> = new Subject();
  c = '';
  optionsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _latestFilteredOptions: ChoosyOptions = [];
  constructor(private _searchService: SearchService) {}

  selectOption(option: ChoosyOption): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      o.state.active = false;
      if (!this.settings.multiSelect.enable) {
        o.state.selected = false;
      }
      if (o.uid === option.uid && this.settings.multiSelect.enable && this.settings.multiSelect.removeOnSelect) {
        o.state.hidden = true;
      }
      if (o.uid === option.uid) {
        o.state.selected = true;
        this.selectedOptionsBucket.push(option);
      }
      return o;
    });
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
    this._triggerAction(opts, 'optionsAdded', options);
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
    this._triggerAction(opts, 'optionRemoved', removedOpt);
  }
  disableOption(fn: (option: any) => boolean): void {
    let disabledOpt = null;
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      if (fn(o.value)) {
        o.state.disabled = fn(o.value);
        disabledOpt = o;
      }
      return o;
    });
    this._triggerAction(opts, 'optionDisabled', disabledOpt);
  }
  setOptionAsSelected(cbOrStr: FilterInput): void {
    let setOpt = null;
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      o.state.selected = false;
      if (typeof cbOrStr === 'function' && cbOrStr(o.value)) {
        o.state.selected = true;
        o.state.active = false;
        setOpt = o;
      } else if (typeof cbOrStr === 'string' && cbOrStr === o.value) {
        o.state.selected = true;
        o.state.active = false;
        setOpt = o;
      }
      if (this.settings.multiSelect.enable && this.settings.multiSelect.removeOnSelect) {
        o.state.hidden = false;
      }
      return o;
    });
    this._triggerAction(opts, 'optionSet', setOpt);
  }
  clearDisabledOption(cbOrStr: FilterInput): void {
    let setOpt = null;
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      if ((typeof cbOrStr === 'function' && cbOrStr(o.value)) || (typeof cbOrStr === 'string' && cbOrStr === o.value)) {
        o.state.disabled = false;
        setOpt = o;
      }
      return o;
    });
    this._triggerAction(opts, 'optionEnabled', setOpt);
  }
  clearAllDisabledOptions(): void {
    const opts = this.optionsSub.getValue().map(o => {
      o.state.disabled = false;
      return o;
    });
    this._triggerAction(opts, 'optionsEnabled');
  }
  clearSelectedOption(option: any): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      if (o.uid === option.uid) {
        o.state.selected = false;
      }
      if (o.uid === option.uid && this.settings.multiSelect.enable) {
        o.state.hidden = false;
      }
      return o;
    });
    this._triggerAction(opts, 'clearedSelectedOptions', option);
  }
  clearAllSelectedOptions(): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      o.state.selected = false;
      o.state.hidden = false;
      return o;
    });
    this._triggerAction(opts, 'clearedAllSelectedOptions');
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
    optionsObs.pipe(map(x => this.mapMetaData(x))).subscribe(x => {
      this.optionsSub.next(x);
      this.optionsLoading.next(false);
    });
  }
  updateOptionHoverState(option: ChoosyOption, status): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      if (o.uid === option.uid) o.state.hover = status;
      return o;
    });
    this._triggerAction(opts, 'optionHoverStateChanged', status);
  }
  updateSettings(settings: any) {
    this.settings = settings;
    this.events.next({ name: 'configUpdated', value: this.settings });
    this.clearAllSelectedOptions();
  }
  // TODO
  // when filter is active (has filtered items) , other actions like add, remove.. should be in sync with filtered items
  filterOptions(keyword: string, searchConfig: ChoosySearch): void {
    const collection = this.optionsSub.getValue();
    if (this._latestFilteredOptions.length === 0) {
      this._latestFilteredOptions = collection;
    }

    this._searchService.search(this._latestFilteredOptions, keyword, searchConfig).then(res => {
      const nxt = keyword.length === 0 ? this._latestFilteredOptions : res;
      this._triggerAction(nxt, 'optionsFiltered', res);
    });
  }
  clearFilteredOptions() {
    this.clearAllActive();
    this._triggerAction(this._latestFilteredOptions, 'clearFilteredOptions', this._latestFilteredOptions);
  }
  mapMetaData(options: any[]): ChoosyOptions {
    return options.map(this.metaData.bind(this));
  }

  isLoading() {
    return this.optionsLoading.asObservable().pipe(share());
  }

  getLastSelectedOption() {
    return this.optionsSub.pipe(
      map(x => x.filter(y => y.state.selected)),
      map(s => (s.length > 0 ? s[s.length - 1] : null))
    );
  }

  getSelectedOptions() {
    return this.optionsSub.pipe(
      map(x => x.filter(y => y.state.selected)),
      map(s => {
        return this.settings.multiSelect ? s.map(d => d.value) : (s[0] && s[0].value) || [];
      })
    );
  }
  private metaData(option): ChoosyOption {
    return {
      uid: this._generateUID(),
      state: {
        disabled: false,
        selected: false,
        hidden: false,
        active: false,
        hover: false
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

  getOptions(): Observable<ChoosyOptions> {
    return this.optionsSub.asObservable();
  }

  clearAllActive() {
    const opts = this.optionsSub.getValue().map(x => {
      x.state.active = false;
      return x;
    });
    this._triggerAction(opts, 'removeAllActive');
  }

  markNextAsActive() {
    let index = 0;
    let uid;
    const items = this.optionsSub.getValue().filter(x => !x.state.hidden && !x.state.disabled);
    const totalItems = items.length;
    const activeItemIndex = items.findIndex(x => x.state.active);
    const selectedItemIndex = items.findIndex(x => x.state.selected);

    if (activeItemIndex === -1 && selectedItemIndex !== -1 && selectedItemIndex < totalItems - 1) {
      index = selectedItemIndex + 1;
    } else if (activeItemIndex === -1 && selectedItemIndex !== -1 && selectedItemIndex === totalItems - 1) {
      index = 0;
    } else if (activeItemIndex === -1) {
      index = 0;
    } else if (activeItemIndex < totalItems - 1) {
      index = activeItemIndex + 1;
    } else if (activeItemIndex === totalItems - 1) {
      index = 0;
    }
    uid = items[index].uid;

    let nextItem;
    const nxt = this.optionsSub.getValue().map((x, i) => {
      x.state.active = false;
      if (x.uid === uid) {
        nextItem = x;
        x.state.active = true;
      }
      return x;
    });

    this._triggerAction(nxt, 'markedNextAsActive', nextItem);
  }
  markPreviousAsActive() {
    let index = 0;
    let uid;
    const items = this.optionsSub.getValue().filter(x => !x.state.hidden && !x.state.disabled);
    const totalItems = items.length;
    const activeItemIndex = items.findIndex(x => x.state.active);
    const selectedItemIndex = items.findIndex(x => x.state.selected);

    if (activeItemIndex === -1 && selectedItemIndex > 0 && selectedItemIndex <= totalItems - 1) {
      index = selectedItemIndex - 1;
    } else if (activeItemIndex === -1 && selectedItemIndex === 0) {
      index = totalItems - 1;
    } else if (activeItemIndex === -1) {
      index = totalItems - 1;
    } else if (activeItemIndex > 0 && activeItemIndex <= totalItems - 1) {
      index = activeItemIndex - 1;
    } else if (activeItemIndex === 0) {
      index = totalItems - 1;
    }
    uid = items[index].uid;

    let prevItem;
    const nxt = this.optionsSub.getValue().map((x, i) => {
      x.state.active = false;
      if (x.uid === uid) {
        prevItem = x;
        x.state.active = true;
      }
      return x;
    });
    this._triggerAction(nxt, 'markedPrevAsActive', prevItem);
  }

  selectActiveOption() {
    const activeOption = this.optionsSub.getValue().filter(z => z.state.active);
    if (activeOption.length > 0) {
      this.selectOption(activeOption[0]);
    }
  }

  ngOnDestroy() {
    this._cleanUp();
  }

  private _triggerAction(options: ChoosyOptions, name: ChoosyEvent, value: any = null) {
    this.optionsSub.next(options);
    this.events.next({ name, value });
  }

  private _generateUID(length = 36): string {
    return Math.random()
      .toString(length)
      .substr(2, 6);
  }

  private _cleanUp() {
    this.optionsSub.complete();
    this.events.complete();
    this.selectedOptionsBucket = [];
  }
}
