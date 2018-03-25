import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { data } from './data';

@Component({
  selector: 'app-headboard',
  templateUrl: './headboard.component.html',
  styles: [
    `
      .headboard{
        text-align: center;
        padding: 1.4rem;
        background: #8BC34A;
        color: #fff;
      }
      h1{
        margin: 0;
        font-weight: 400;
        font-size: 1.5rem;
      }
      p{
        opacity: 0.5;
        margin: 0;
      }
    `
  ]
})
export class HeadboardComponent implements OnInit {
  data = data;
  config: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.name', 'value.email', 'value.region']
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
