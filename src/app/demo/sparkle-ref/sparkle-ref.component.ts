import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Sparkle } from '../../module/sparkle/sparkle';
import { HelloComponent } from './hello.component';
import { RelativePosition } from '../../module/sparkle/position/relative-position';
import { GlobalPosition } from '../../module/sparkle/position/global-position';
import { InsidePlacement, OutsidePlacement } from '../../module/sparkle/models';
import { SparkleRef } from '../../module/sparkle/sparke-ref';
import { ChoosyComponent } from '../../module/choosy/core/components/choosy/choosy.component';

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
    const relative = new RelativePosition({
      pos: OutsidePlacement.BOTTOM,
      src: this.anchor.nativeElement,
      hostWidth: 'auto',
      autoUpdate: true
    });
    const global = new GlobalPosition({
      placement: InsidePlacement.CENTER,
      hostWidth: 'auto',
      hostHeight: 'auto'
    });
    this.ref = this.sparkle
      .host(ChoosyComponent, props)
      .overlay(relative)
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
