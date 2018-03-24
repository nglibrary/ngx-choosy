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
  dropdown: {
    height: 300
  },
  type: '',
  displayValue: 'value',
  theme: 'default',
  multiselect: {
    removeOnSelect: false
  },
  autocomplete: {
    minChars: 2
  }
};
