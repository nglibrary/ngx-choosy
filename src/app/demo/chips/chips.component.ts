import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { data } from './data';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styles: []
})
export class ChipsComponent implements OnInit {
  data = data;
  config: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.email', 'email']
    },
    displayValue: 'value.email',
    type: 'multi-select'
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
}
