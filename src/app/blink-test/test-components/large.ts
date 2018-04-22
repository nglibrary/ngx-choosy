import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'doc-large-comp',
  template: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, saepe voluptatibus.
  Ab amet animi asperiores beatae consequuntur deserunt excepturi,
  exercitationem in, itaque molestiae praesentium quia quis sunt
  tempore ullam voluptatibus.`
})
export class LargeComponent implements OnInit {
  name = 'large';
  events = new Subject();

  constructor() {
  }

  ngOnInit() {
  }
}
