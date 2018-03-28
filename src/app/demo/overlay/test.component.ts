import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <p>I am a dynamic component;</p>
  `,
  styles: [
    `
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
