import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';

@Component({
  selector: 'app-dropdown-directive',
  templateUrl: './dropdown-directive.component.html',
  styles: []
})
export class DropdownDirectiveComponent implements OnInit {
  data = ['hello', 'boy!'];
  greet;
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
