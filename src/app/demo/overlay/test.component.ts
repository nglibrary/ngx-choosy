import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    I am a dynamic component text...
  `,
  styles: [
    `
      :host{
        width:100%;
      }
      p{
        // background-color:#fff;
        // border:1px solid #aaa;
        // padding:10px;
      }
    `
  ]
})
export class TestComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
