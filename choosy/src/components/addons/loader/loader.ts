import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'choosy-loader',
  template: `
  <div class="choosy-loading">
    loading...
  </div>
  `
})
export class Loader implements OnInit {
  constructor() {}

  ngOnInit() {}
}
