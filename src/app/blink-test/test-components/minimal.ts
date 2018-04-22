import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'doc-minimal-comp',
  template: `Hello world`
})
export class MinimalComponent implements OnInit,OnDestroy {
  name = 'minimal';
  events = new Subject();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('im destroying the component');
  }
}
