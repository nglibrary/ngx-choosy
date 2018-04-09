import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChoosyComponent } from './core/components/choosy/choosy.component';
import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { ListComponent } from './common/components/list/list.component';
import { ItemsComponent } from './common/components/items/items.component';
import { ChipsComponent } from './common/components/chips/chips.component';

import { SelectDirective } from './common/directives/select.directive';
// import { ChoosyMenuDirective } from './directives/choosy-menu.directive';
// import { ChoosyMultiSelectDirective } from './directives/choosy-multi-select.directive';

import { ConfigService, ListService, SearchService } from './core/services';
import { CHOOSY_CONFIG, choosyDefaultConfig } from './config';
import { GroupByPipe } from './common/pipes/groupby.pipe';
import { SparkleModule } from '../sparkle/sparkle.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SparkleModule],
  declarations: [
    ChoosyComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    ItemsComponent,
    ChipsComponent,
    SelectDirective,
    // ChoosyMenuDirective,
    // ChoosyMultiSelectDirective,
    GroupByPipe
  ],
  entryComponents: [ChoosyComponent],
  exports: [
    ChoosyComponent,
    ItemsComponent,
    ChipsComponent,
    SelectDirective
    // ChoosyMenuDirective,
    // ChoosyMultiSelectDirective
  ],
  providers: [ConfigService, ListService, SearchService]
})
export class ChoosyModule {
  static forRoot(globalConfig: any = {}): ModuleWithProviders {
    return {
      ngModule: ChoosyModule,
      providers: [
        {
          provide: CHOOSY_CONFIG,
          useValue: choosyDefaultConfig
        }
      ]
    };
  }
}
