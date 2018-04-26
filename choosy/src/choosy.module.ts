import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chips, InfoPanel, Loader, SearchBar } from './components/addons';
import { Basic, SimpleGroup } from './components/main';
import { GroupedList, SimpleList } from './components/views';
import { ConfigService, OptionsService, SearchService } from './services';
import { GroupByPipe } from './pipes';
import { DEFAULT_CONFIG, choosyDefaultConfig } from './default-config';

const COMPONENTS = [Chips, InfoPanel, Loader, SearchBar, Basic, SimpleGroup, GroupedList, SimpleList];
const SERVICES = [ConfigService, OptionsService, SearchService];
const PIPES = [GroupByPipe];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS],
  providers: [...SERVICES]
})
export class ChoosyModule {
  static forRoot(globalConfig: any = {}): ModuleWithProviders {
    return {
      ngModule: ChoosyModule,
      providers: [
        {
          provide: DEFAULT_CONFIG,
          useValue: choosyDefaultConfig
        }
      ]
    };
  }
}
