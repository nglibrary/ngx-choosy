import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestComponent } from './test.component';
import { RelativePosition } from '../../module/ngx-choosy/sparkle/position/relative-position';
import { Overlay } from '../../module/ngx-choosy/sparkle/overlay';
import { InsidePlacement } from '../../module/ngx-choosy/sparkle/models';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styles: [
    `
      div.frame{
        background: #E0F7FA;
        margin: 3rem 0;
        border-radius: 3px;
      }
      .center{
        display: inline-block;
        width: 500px;
        margin-left: 10rem;
        margin-top: 5rem;
        padding: 2rem;
        background: #CE93D8;
        border-radius: 3px;
        box-shadow: 0px 13px 28px rgba(189, 189, 189, 0.32);
        color: #fff;
      }
    `
  ]
})
export class OverlayComponent implements OnInit {
  ref1;
  ref2;
  host1;
  host2;
  @ViewChild('src', { read: ElementRef })
  src: ElementRef;
  positions = [InsidePlacement.BOTTOM, InsidePlacement.LEFT, InsidePlacement.RIGHT, InsidePlacement.TOP];
  positionIndex = 3;
  position: any = '';
  constructor(private overlay: Overlay) {}

  ngOnInit() {
    this.position = this.positions[this.positionIndex];
  }
  switchPos() {
    this.positionIndex++;
    this.position = this.positions[this.positionIndex];
    if (this.positionIndex === this.positions.length) {
      this.positionIndex = 0;
    }
  }
  create1(e) {
    this.ref1 = this.overlay.create(new RelativePosition({ src: this.src.nativeElement, pos: this.position }));
    this.host1 = this.ref1.attachComponent(TestComponent);
    console.log('ref1', this.ref1);
  }
  delete1() {
    // this.host1.detach();
    // this.ref1.destroy();
  }
}
