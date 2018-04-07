import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Sparkle } from '../../module/ngx-choosy/sparkle/sparkle';
import { HelloComponent } from './hello.component';
import { RelativePosition } from '../../module/ngx-choosy/sparkle/position/relative-position';
import { GlobalPosition } from '../../module/ngx-choosy/sparkle/position/global-position';
import { InsidePlacement, OutsidePlacement } from '../../module/ngx-choosy/sparkle/models';
import { SparkleRef } from '../../module/ngx-choosy/sparkle/sparke-ref';

@Component({
  selector: 'app-sparkle-ref',
  templateUrl: './sparkle-ref.component.html'
})
export class SparkleRefComponent implements OnInit {
  @ViewChild('anchor', { read: ElementRef })
  anchor: ElementRef;
  ref: SparkleRef<HelloComponent>;
  constructor(private sparkle: Sparkle<HelloComponent>) {}

  ngOnInit() {
    this.ref = this.sparkle
      .host(HelloComponent)
      .overlay(
        new RelativePosition({
          pos: OutsidePlacement.BOTTOM,
          src: this.anchor.nativeElement,
          hostWidth: 'auto'
        })
      )
      .create();
  }
  create() {
    const r = this.ref.open();
    r.events['overlay'].subscribe(a => {
      console.log('listening..', a);
    });
  }
}
