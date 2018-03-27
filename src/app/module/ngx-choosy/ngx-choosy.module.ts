import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChoosyComponent } from './components/choosy/choosy.component';
import { ChoosyHeaderComponent } from './components/choosy-header/choosy-header.component';
import { ChoosyFooterComponent } from './components/choosy-footer/choosy-footer.component';
import { ChoosyListComponent } from './components/choosy-list/choosy-list.component';
import { ChoosyItemsComponent } from './components/choosy-items/choosy-items.component';
import { ChoosyChipsComponent } from './components/choosy-chips/choosy-chips.component';

import { ChoosySelectDirective } from './directives/choosy-select.directive';
import { ChoosyMenuDirective } from './directives/choosy-menu.directive';
import { ChoosyMultiSelectDirective } from './directives/choosy-multi-select.directive';

import {
  ChoosyConfigService,
  ChoosyListService,
  ChoosySearchService,
  ChoosyHostService,
  OverlayService,
  DomService
} from './services';
import { CHOOSY_CONFIG, choosyDefaultConfig } from './config';
import { GroupByPipe } from './pipes/groupby.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    ChoosyComponent,
    ChoosyHeaderComponent,
    ChoosyFooterComponent,
    ChoosyListComponent,
    ChoosyItemsComponent,
    ChoosyChipsComponent,
    ChoosySelectDirective,
    ChoosyMenuDirective,
    ChoosyMultiSelectDirective,
    GroupByPipe
  ],
  entryComponents: [ChoosyComponent],
  exports: [
    ChoosyComponent,
    ChoosyItemsComponent,
    ChoosyChipsComponent,
    ChoosySelectDirective,
    ChoosyMenuDirective,
    ChoosyMultiSelectDirective
  ],
  providers: [
    ChoosyConfigService,
    ChoosyListService,
    ChoosySearchService,
    ChoosyHostService,
    OverlayService,
    DomService
  ]
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
