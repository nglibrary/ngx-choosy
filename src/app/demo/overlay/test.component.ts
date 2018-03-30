import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <p class="m-0">I am a dynamic component! hoohoo</p>
  `,
  styles: [
    `
      :host{
        width:100%;
      }
      p{
        display:inline-block;
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
