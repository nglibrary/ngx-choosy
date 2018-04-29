import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'choosy-loader-widget',
  template: `
  <div class="choosy-loader">
    <i class="choosy-icon choosy-icon-loader choosy-icon-spin"></i> 
    loading...
  </div>
  `
})
export class LoaderWidget implements OnInit {
  constructor() {}

  ngOnInit() {}
}
