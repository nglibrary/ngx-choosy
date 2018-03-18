import { Component, OnInit } from '@angular/core';

import { data } from './simple-array-data';
import { ChoosyConfig } from '../../module/ngx-choosy/models';

@Component({
  selector: 'app-demo-choosy',
  templateUrl: './choosy.component.html',
  styles: []
})
export class ChoosyComponent implements OnInit {
  searchToggle = false;
  footerToggle = false;
  options = data;
  events = [];
  config: Partial<ChoosyConfig> = {
    type: 'select'
  };
  constructor() {}

  ngOnInit() {}
  toggleSearch() {
    this.searchToggle = !this.searchToggle;
    this.config.search = { enable: this.searchToggle };
    this.config = { ...this.config };
  }
  toggleFooter() {
    this.footerToggle = !this.footerToggle;
    this.config.footer = { enable: this.footerToggle };
    this.config = { ...this.config };
  }
  selectOne(ref) {
    ref.listService.setOptionAsSelected(x => x === 'Shufflebeat');
  }
  deselectAll(ref) {
    ref.listService.clearAllSelectedOptions();
  }
  selectMultiple(ref) {
    this.config.type = 'multi-select';
    this.config = { ...this.config };
    ref.listService.updateSettings(this.config);
  }
  clearFiltered(ref) {
    ref.listService.clearFilteredOptions();
  }
  captureEvents(e) {
    this.events.unshift(e);
  }
}
