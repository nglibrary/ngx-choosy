import { Injectable, Inject } from '@angular/core';
import merge from 'deepmerge';
import { ChoosyConfig } from '../models';
import { DEFAULT_CONFIG } from '../default-config';
@Injectable()
export class ConfigService {
  constructor(@Inject(DEFAULT_CONFIG) public defaultConfig: ChoosyConfig) {}

  mergeWithDefault(config: Partial<ChoosyConfig>): ChoosyConfig {
    return merge(this.defaultConfig, config);
  }

  mergeAllWithDefault(...configs: Partial<ChoosyConfig>[]): ChoosyConfig {
    return merge.all([this.defaultConfig, ...configs]);
  }
}
