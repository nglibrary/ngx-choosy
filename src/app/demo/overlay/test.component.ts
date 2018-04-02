import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    JOHN DOE
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
export class TestComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
