import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { data as d1 } from '../choosy-with-tpl/data';
import { data as d2 } from './data';

@Component({
  selector: 'app-checkbox-select',
  templateUrl: './checkbox-select.component.html',
  styles: []
})
export class CheckboxSelectComponent implements OnInit {
  data1 = d1;
  data2 = d2;
  config1: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.email']
    },
    displayValue: 'value.email',
    type: 'multi-select',
    multiselect: {
      checkbox: true
    }
  };
  config2: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value']
    },
    displayValue: 'value',
    type: 'multi-select',
    multiselect: {
      checkbox: true
    }
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
