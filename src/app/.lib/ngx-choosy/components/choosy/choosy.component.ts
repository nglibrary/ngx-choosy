import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { ChoosyConfig } from '../../models/config.model';
import { TemplateRef } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy',
  templateUrl: 'choosy.component.html',
  exportAs: 'config',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChoosyComponent implements OnInit {
  @Input() config: ChoosyConfig = {};
  @Input() options: any[] = [];
  @Input() optionTpl: TemplateRef<any>;
  constructor() {}
  ngOnInit() {
    console.log('config', this.config);
    console.log('options', this.options);
    console.log('optionTpl', this.optionTpl);
  }
}
