import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoosyComponent } from './components/choosy/choosy.component';
import { ChoosyHeaderComponent } from './components/choosy-header/choosy-header.component';
import { ChoosyFooterComponent } from './components/choosy-footer/choosy-footer.component';
import { ChoosyListComponent } from './components/choosy-list/choosy-list.component';

import {
  ChoosyConfigService,
  ChoosyListService,
  ChoosySearchService
} from './services';
import { CHOOSY_CONFIG, choosyDefaultConfig } from './config';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChoosyComponent,
    ChoosyHeaderComponent,
    ChoosyFooterComponent,
    ChoosyListComponent
  ],
  exports: [ChoosyComponent],
  providers: [ChoosyConfigService, ChoosyListService, ChoosySearchService]
})
export class NgxChoosyModule {
  static forRoot(globalConfig: any = {}): ModuleWithProviders {
    return {
      ngModule: NgxChoosyModule,
      providers: [
        {
          provide: CHOOSY_CONFIG,
          useValue: choosyDefaultConfig
        }
      ]
    };
  }
}
