import { Component, OnInit } from '@angular/core';
import { SparkleFriendly } from '../../module/ngx-choosy/sparkle/sparkle';

@Component({
  selector: 'app-hello',
  template: `
  JAMES BOND
  `,
  styles: [
    `
      :host{
        width:100%;
        background-color:#fff;
        border:1px solid #aaa;
        padding:10px;
      }
    `
  ]
})
export class HelloComponent implements OnInit, SparkleFriendly {
  events;
  config;
  constructor() {}

  ngOnInit() {}
}
