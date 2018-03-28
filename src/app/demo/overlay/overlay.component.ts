import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OverlayService } from '../../module/ngx-choosy/services';
import { TestComponent } from './test.component';
import { RelativeToElement } from '../../module/ngx-choosy/classes/position/relative-to-el.class';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html'
})
export class OverlayComponent implements OnInit {
  ref1;
  ref2;
  host1;
  host2;
  @ViewChild('src', { read: ElementRef })
  src: ElementRef;
  constructor(private overlay: OverlayService) {}

  ngOnInit() {}
  trigger() {}
  create1(e) {
    this.ref1 = this.overlay.create(new RelativeToElement({ src: this.src.nativeElement }));
    this.host1 = this.ref1.attachComponent(TestComponent);
    console.log('ref1', this.ref1);
  }
  create2(e) {
    this.ref2 = this.overlay.create(new RelativeToElement({ src: this.src.nativeElement }));
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
