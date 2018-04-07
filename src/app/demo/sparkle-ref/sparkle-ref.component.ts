import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Sparkle } from '../../module/ngx-choosy/sparkle/sparkle';
import { HelloComponent } from './hello.component';
import { RelativePosition } from '../../module/ngx-choosy/sparkle/position/relative-position';
import { GlobalPosition } from '../../module/ngx-choosy/sparkle/position/global-position';
import { InsidePlacement, OutsidePlacement } from '../../module/ngx-choosy/sparkle/models';
import { SparkleRef } from '../../module/ngx-choosy/sparkle/sparke-ref';
import { ChoosyComponent } from '../../module/ngx-choosy/components/choosy/choosy.component';

@Component({
  selector: 'app-sparkle-ref',
  templateUrl: './sparkle-ref.component.html'
})
export class SparkleRefComponent implements OnInit {
  @ViewChild('anchor', { read: ElementRef })
  anchor: ElementRef;
  ref: SparkleRef<ChoosyComponent>;
  data = ['one', 'two', 'three'];
  constructor(private sparkle: Sparkle<ChoosyComponent>) {}

  ngOnInit() {
    const props = {
      options: this.data
    };
    this.ref = this.sparkle
      .host(ChoosyComponent, props)
      .overlay(
        new RelativePosition({
          pos: OutsidePlacement.BOTTOM_LEFT,
          src: this.anchor.nativeElement,
          hostWidth: 'auto'
        })
      )
      .create();
  }
  create() {
    const r = this.ref.open();
    r.events['overlay'].subscribe(a => {
      console.log('Overlay: listening..', a);
    });
    r.events['choosy'].subscribe(a => {
      console.log('Choosy: listening..', a);
    });
  }
}
