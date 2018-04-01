import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <h1>Hello</h1>
    <p>I am a dynamic component text...</p>
    <ul>
      <li><strong>unordered list</strong> — used to group a set of related items in no particular order</li>
      <li><strong>ordered list</strong> — used to group a set of related items in a specific order</li>
      <li><strong>description list</strong> — used to display name/value pairs such as terms and definitions</li>
    </ul>
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
