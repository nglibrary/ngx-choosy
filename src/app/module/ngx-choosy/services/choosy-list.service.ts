import { Injectable } from '@angular/core';
import { ChoosyOption, ChoosyOptions, ChoosyEvent } from '../models';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChoosySearchService } from './choosy-search.service';

@Injectable()
export class ChoosyListService {
  optionsSub: BehaviorSubject<ChoosyOptions>;
  events: Subject<{ name: ChoosyEvent; value: any }> = new Subject();
  private latestFilteredOptions: ChoosyOptions = [];
  constructor(private searchService: ChoosySearchService) {}

  selectOption(option: ChoosyOption): void {
    const opts = this.optionsSub.getValue().map((o: ChoosyOption) => {
      o.state.selected = false;
      if (o.uid === option.uid) {
        o.state.selected = true;
      }
      return o;
    });
    this.optionsSub.next(opts);
    this.events.next({ name: 'optionSelected', value: option.value });
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

  getAllSelectedOptions(): any[] {
    return this.optionsSub
      .getValue()
      .filter((o: ChoosyOption) => o.state.selected)
      .map((o: ChoosyOption) => o.value);
  }

  setOptionsSub(optionsSub: BehaviorSubject<ChoosyOptions>): void {
    this.optionsSub = optionsSub;
  }
  // TODO
  // when filter is active (has filtered items) , other actions like add, remove.. should be in sync with filtered items
  filterOptions(keyword: string): void {
    const collection = this.optionsSub.getValue();
    if (this.latestFilteredOptions.length === 0) {
      this.latestFilteredOptions = this.optionsSub.getValue();
    }

    this.searchService.search(this.latestFilteredOptions, keyword).then(res => {
      const nxt = res.length === 0 ? this.latestFilteredOptions : res;
      this.optionsSub.next(nxt);
      this.events.next({ name: 'optionsFiltered', value: null });
    });
  }
  mapMetaData(options: any[]): ChoosyOptions {
    return options.map(this.metaData.bind(this));
  }
  private metaData(option): ChoosyOption {
    return {
      uid: this.generateUID(),
      state: {
        disabled: false,
        selected: false,
        hidden: false
      },
      value:
        !option ||
        (typeof option === 'object' && Object.keys(option).length === 0)
          ? '-'
          : option
    };
  }

  private generateUID(length = 36): string {
    return Math.random()
      .toString(length)
      .substr(2, 6);
  }
}
