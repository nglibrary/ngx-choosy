import { Injectable, Optional, Inject } from '@angular/core';
import * as merge from 'deepmerge';
import { ChoosyConfig } from '../../interfaces';

export class GlobalConfigData {}

@Injectable()
export class ChoosyConfigService {
  private defaultConfig: ChoosyConfig = {
    _local: {},
    theme: 'default',
    labels: {
      inputPlaceholder: 'Choose',
      searchPlaceholder: 'Search',
      noResultsToDisplay: 'No results found',
      noOptionsToDisplay: 'No Options to display',
      noOptionsProvided: 'No Options provided',
      XRecordsMatches: 'Records matching',
      XRecords: 'Records'
    },
    search: {
      enable: true,
      shouldSort: true,
      threshold: 0.0,
      tokenize: true,
      matchAllTokens: true,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['value'],
      autoFocus: true,
      hasClearBtn: true
    },
    dropdown: {
      size: 'AUTO',
      width: 300,
      height: 200,
      animation: false
    },
    footer: {
      enable: true,
      countSummary: true
    },
    keyboardShortcuts: {
      enable: false
    }
  };
  globalConfig: ChoosyConfig = {};
  constructor(@Inject('CONFIG') config: any) {
    this.globalConfig = merge.default(this.defaultConfig, config);
    console.log('cfsr', this);
  }
  getLocalConfig(localConfig: ChoosyConfig): ChoosyConfig {
    console.log(this.globalConfig, localConfig);
    return merge.default(this.globalConfig, localConfig);
  }
  getGlobalConfig() {
    return this.globalConfig;
  }
}
