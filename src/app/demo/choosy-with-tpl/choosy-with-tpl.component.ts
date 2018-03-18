import { Component, OnInit } from '@angular/core';
import { data } from './data';
import { ChoosyConfig } from '../../module/ngx-choosy/models';

@Component({
  selector: 'app-choosy-with-tpl',
  templateUrl: './choosy-with-tpl.component.html',
  styles: []
})
export class ChoosyWithTplComponent implements OnInit {
  data = data;
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
}
