import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'choosy-loader-widget',
  template: `
  <div class="choosy-loading">
    loading...
    <i class="choosy-icon choosy-icon-loader"></i>
  </div>
  `
})
export class LoaderWidget implements OnInit {
  constructor() {}

  ngOnInit() {}
}
