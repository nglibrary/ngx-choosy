import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <h1>I am a dynamic component;</h1>
  `
})
export class TestComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
