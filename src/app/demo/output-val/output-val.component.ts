import { Component, OnInit } from '@angular/core';
import { data } from './data';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { ChoosyListService } from '../../module/ngx-choosy/services';
import { ChoosyComponent } from '../choosy/choosy.component';

@Component({
  selector: 'app-output-val',
  templateUrl: './output-val.component.html',
  styles: []
})
export class OutputValComponent implements OnInit {
  data = data;
  config: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.email', 'email']
    },
    displayValue: 'value.email',
    type: 'select'
  };
  type = 'select';
  events = [];
  output = null;
  constructor() {}

  ngOnInit() {}
  captureEvents(e) {
    this.events.unshift(e);
  }
  toggleSelect(ref, type) {
    this.type = type;
    this.config.type = type;
    this.config = { ...this.config };
    ref.listService.updateSettings(this.config);
  }
  selected(e) {
    console.log('option selected', e);
    this.output = e;
  }
}
