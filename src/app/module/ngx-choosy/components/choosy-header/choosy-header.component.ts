import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-header',
  templateUrl: './choosy-header.component.html'
})
export class ChoosyHeaderComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
