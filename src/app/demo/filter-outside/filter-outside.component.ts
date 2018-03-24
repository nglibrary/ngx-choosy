import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { data } from './data';

@Component({
  selector: 'app-filter-outside',
  templateUrl: './filter-outside.component.html',
  styles: []
})
export class FilterOutsideComponent implements OnInit {
  data = data;
  config: Partial<ChoosyConfig> = {
    search: {
      enable: false,
      keys: ['value.email']
    },
    displayValue: 'value.email',
    type: 'select',
    footer: {
      enable: true
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
  filter(e, ref) {
    console.log('filter..', e);
    ref.onSearch(e);
  }
  search(e, ref) {
    ref.onSearch(e);
  }

  keypressed(e, ref) {
    console.log('KEY', e);
    ref.keypressSub.next(e);
  }
}
