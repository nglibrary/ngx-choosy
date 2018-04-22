import { InjectionToken } from '@angular/core';
import { ChoosyConfig } from './models';

export const CHOOSY_CONFIG = new InjectionToken<ChoosyConfig>('choosy-default-config');

export const choosyDefaultConfig: ChoosyConfig = {
  search: {
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
    hasClearBtn: true,
    enable: true
  },
  footer: {
    enable: false
  },
  dropDown: {
    height: 300
  },
  type: '',
  displayValue: 'value',
  theme: 'default',
  multiSelect: {
    removeOnSelect: false,
    checkbox: false
  },
  autoComplete: {
    minChars: 2
  },
  groupBy: null
};
