import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../../module/ngx-choosy/services';
import { TestComponent } from './test.component';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styles: []
})
export class OverlayComponent implements OnInit {
  ref1;
  ref2;
  host1;
  host2;
  constructor(private overlay: OverlayService) {}

  ngOnInit() {}
  trigger() {}
  create1(e) {
    this.ref1 = this.overlay.create();
    this.host1 = this.ref1.attachComponent(TestComponent);
    console.log('ref1', this.ref1);
  }
  create2(e) {
    this.ref2 = this.overlay.create();
    console.log('ref2', this.ref2);
  }
  delete1() {
    this.host1.detach();
    this.ref1.destroy();
  }
  delete2() {
    this.ref2.destroy();
  }
}
