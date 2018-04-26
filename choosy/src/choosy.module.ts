import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chips, InfoPanel, Loader, SearchBar } from './components/addons';
import { Basic, SimpleGroup, Previewer } from './components/main';
import { GroupedList, SimpleList, Split } from './components/views';
import { ConfigService, OptionsService, SearchService } from './services';
import { GroupByPipe } from './pipes';
import { DEFAULT_CONFIG, choosyDefaultConfig } from './default-config';

const COMPONENTS = [Chips, InfoPanel, Loader, SearchBar, Basic, SimpleGroup, Previewer, GroupedList, SimpleList, Split];
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
