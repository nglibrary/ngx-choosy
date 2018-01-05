import { Injectable, Inject } from '@angular/core';
import merge from 'deepmerge';
import { ChoosyConfig } from '../models';
import { CHOOSY_CONFIG } from '../config';

@Injectable()
export class ChoosyConfigService {
  constructor(@Inject(CHOOSY_CONFIG) public defaultConfig: ChoosyConfig) {}

  mergeWithDefault(localConfig: Partial<ChoosyConfig>): ChoosyConfig | object {
    return merge(this.defaultConfig, localConfig);
  }
}
