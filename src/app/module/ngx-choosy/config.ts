import { InjectionToken } from '@angular/core';
import { ChoosyConfig } from './models';

export const CHOOSY_CONFIG = new InjectionToken<ChoosyConfig>(
  'choosy-default-config'
);

export const choosyDefaultConfig: ChoosyConfig = {
  search: {},
  footer: {}
};
