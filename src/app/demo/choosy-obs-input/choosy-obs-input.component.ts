import { Component, OnInit } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operator/delay';

@Component({
  selector: 'app-choosy-obs-input',
  templateUrl: './choosy-obs-input.component.html',
  styles: []
})
export class ChoosyObsInputComponent implements OnInit {
  data: any;
  config: Partial<ChoosyConfig> = {
    search: {
      enable: true,
      keys: ['value.model', 'model']
    },
    footer: {
      enable: true
    },
    displayValue: 'value.model',
    type: 'multi-select'
  };
  events = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.data = this.http.get('https://api.myjson.com/bins/gpwa3');
  }
  captureEvents(e) {
    this.events.unshift(e);
  }
  selected(e) {
    console.log('selected this:', e);
  }
}
