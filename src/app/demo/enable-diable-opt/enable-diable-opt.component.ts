import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';

@Component({
  selector: 'app-enable-diable-opt',
  templateUrl: './enable-diable-opt.component.html',
  styles: []
})
export class EnableDiableOptComponent implements OnInit {
  data = ['hello', 'hi', 'welcome', 'greet'];
  config: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.email', 'email']
    },
    displayValue: 'value.email',
    type: 'select'
  };
  events = [];
  constructor() {}

  ngOnInit() {}
  captureEvents(e) {
    this.events.unshift(e);
  }
  selected(e) {
    console.log('option selected', e);
  }
  disable(r) {
    r.listService.disableOption(x => x === 'hi');
  }
  enable(r) {
    r.listService.clearDisabledOption(x => x === 'hi');
  }
}
