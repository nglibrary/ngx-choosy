import { Component, OnInit } from '@angular/core';
import { ChoosyDemoBaseComponent } from '../base';
import { names } from './data';

@Component({
  selector: 'doc-demo-basic',
  templateUrl: './basic.component.html',
  styles: []
})
export class BasicComponent extends ChoosyDemoBaseComponent implements OnInit {
  options = names;
  constructor() {
    super();
    this.options.length = 5;
  }

  ngOnInit() {}
}
