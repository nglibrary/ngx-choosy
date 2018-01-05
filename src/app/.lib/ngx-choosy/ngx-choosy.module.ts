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
  ChoosySearchComponent,
  ChoosyComponent
} from './components';
import {
  ChoosyComponentBuilderService,
  ChoosyConfigService,
  ChoosyDomService,
  ChoosyManagerService,
  GlobalConfigData
} from './services';
import {
  ChoosyButtonSelectDirective,
  ChoosySingleSelectDirective
} from './directives';
import { InjectionToken } from '@angular/core';

// export function ChoosyConfigLoader(globalConfig: any): ChoosyConfigService {
//   return new ChoosyConfigService();
// }

const CONFIG = new InjectionToken('CONFIG');

@NgModule({
  imports: [CommonModule],
  entryComponents: [ChoosyResultsComponent],
  declarations: [
    ChoosyComponent,
    ChoosySearchComponent,
    ChoosyListComponent,
    ChoosyResultsComponent,
    ChoosyFooterComponent,
    ChoosySingleSelectDirective
    // ChoosyButtonSelectDirective
  ],
  exports: [
    ChoosyComponent,
    ChoosySearchComponent,
    ChoosyListComponent,
    ChoosyResultsComponent,
    ChoosyFooterComponent,
    ChoosySingleSelectDirective
    // ChoosyButtonSelectDirective
  ],
  providers: [
    ChoosyConfigService,
    ChoosyManagerService,
    ChoosyDomService,
    ChoosyComponentBuilderService
  ]
})
export class NgxChoosyModule {
  static forRoot(globalConfig: any = {}): ModuleWithProviders {
    return {
      ngModule: NgxChoosyModule,
      providers: [
        {
          provide: 'CONFIG',
          useValue: {}
        }
      ]
    };
  }
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxChoosyModule
  ) {
    if (parentModule)
      throw new Error(
        'NgxChoosyModule is already loaded. Import it in the Parent only'
      );
  }
}
