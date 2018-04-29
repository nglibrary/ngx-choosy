import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChipsWidget, FilterWidget, InfoPanelWidget, LoaderWidget, OptionWidget } from './components/widgets';
import { Basic, SimpleGroup, Previewer } from './components/main';
import { GroupedList, SimpleList, Split } from './components/views';
import { ConfigService, OptionsService, SearchService } from './services';
import { GroupByPipe } from './pipes';
import { DEFAULT_CONFIG, choosyDefaultConfig } from './default-config';

const WIDGETS = [ChipsWidget, FilterWidget, InfoPanelWidget, LoaderWidget, OptionWidget];
const COMPONENTS = [Basic, SimpleGroup, Previewer, GroupedList, SimpleList, Split];
const SERVICES = [ConfigService, OptionsService, SearchService];
const PIPES = [GroupByPipe];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...COMPONENTS, ...WIDGETS, ...PIPES],
  exports: [...COMPONENTS, ...WIDGETS],
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
