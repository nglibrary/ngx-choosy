import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styles: []
})
export class AutocompleteComponent implements OnInit {
  data = [];
  config: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.name']
    },
    footer: {
      enable: true
    },
    displayValue: 'value.email',
    type: 'multi-select'
  };
  events = [];

  constructor(private http: HttpClient) {}
  fetchRepo(query) {
    const url_dum = `https://api.myjson.com/bins/o7xt3?q=${query}`;
    const url_or = `https://api.github.com/search/repositories?q=${query}`;
    return this.http.get(url_or).map((r: any) => r.items);
    // return this.http.get(url_dum);
  }
  ngOnInit() {}
  captureEvents(e) {
    this.events.unshift(e);
  }
  selected(e) {
    console.log('option selected', e);
  }

  fetch(k, ref) {
    ref.fetch(k);
  }
}
