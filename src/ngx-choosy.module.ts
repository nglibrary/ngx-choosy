import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import {
  ChoosyFooterComponent,
  ChoosyListComponent,
  ChoosyResultsComponent,
  ChoosySearchComponent
} from './components';
import { ChoosyButtonSelectDirective, ChoosySingleSelectDirective } from './directives';
import { ChoosyConfigService, GlobalConfigData } from './services/choosy-config/choosy-config.service';

export function ChoosyConfigLoader(globalConfig: any): ChoosyConfigService {
  return new ChoosyConfigService(globalConfig);
}

@NgModule({
  imports: [CommonModule],
  entryComponents: [
    ChoosyResultsComponent
  ],
  declarations: [
    ChoosySearchComponent,
    ChoosyListComponent,
    ChoosyResultsComponent,
    ChoosyFooterComponent,
    ChoosySingleSelectDirective,
    ChoosyButtonSelectDirective
  ],
  exports: [
    ChoosySearchComponent,
    ChoosyListComponent,
    ChoosyResultsComponent,
    ChoosyFooterComponent,
    ChoosySingleSelectDirective,
    ChoosyButtonSelectDirective
  ],
  providers: [ChoosyConfigService]
})
export class NgxChoosyModule {
  static forRoot(globalConfig: any): ModuleWithProviders {
    return {
      ngModule: NgxChoosyModule,
      providers: [
        { provide: ChoosyConfigLoader, useValue: globalConfig }
      ]
    };
  }
  constructor( @Optional() @SkipSelf() parentModule: NgxChoosyModule) {
    if (parentModule)
      throw new Error('NgxChoosyModule is already loaded. Import it in the Parent only');
  }
}
