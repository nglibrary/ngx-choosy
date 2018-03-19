import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { data } from './data';

@Component({
  selector: 'app-choosy-add-rem-opt',
  templateUrl: './choosy-add-rem-opt.component.html'
})
export class ChoosyAddRemOptComponent implements OnInit {
  data = data;
  config: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.first_name']
    },
    displayValue: 'value.first_name',
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
  addOption(r) {
    r.listService.addOptions({
      id: 6,
      first_name: 'Selie',
      last_name: 'Gulliman',
      email: 'sgulliman5@hp.com',
      gender: 'Female',
      ip_address: '58.139.247.122'
    });
  }
  removeOption(r) {
    r.listService.removeOption(x => x.id === 2);
  }
}
