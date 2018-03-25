import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { data } from './data';

@Component({
  selector: 'app-groupby',
  templateUrl: './groupby.component.html',
  styles: []
})
export class GroupbyComponent implements OnInit {
  data = data;
  config: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.email', 'email']
    },
    displayValue: 'value.email',
    type: 'select',
    groupBy: 'gender'
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
