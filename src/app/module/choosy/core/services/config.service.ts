import { Injectable, Inject } from '@angular/core';
import merge from 'deepmerge';
import { Config } from '../../models';
import { CHOOSY_CONFIG } from '../../config';

@Injectable()
export class ConfigService {
  constructor(@Inject(CHOOSY_CONFIG) public defaultConfig: Config) {}

  mergeWithDefault(localConfig: Partial<Config>): Config | object {
    return merge(this.defaultConfig, localConfig);
  }

  mergeAllWithDefault(...configs) {
    return merge.all([this.defaultConfig, ...configs]);
  }
}
