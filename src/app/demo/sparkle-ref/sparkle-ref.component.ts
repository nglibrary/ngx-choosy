import { Component, OnInit } from '@angular/core';
import { Sparkle } from '../../module/ngx-choosy/sparkle/sparkle';
import { HelloComponent } from './hello.component';
import { RelativePosition } from '../../module/ngx-choosy/sparkle/position/relative-position';
import { GlobalPosition } from '../../module/ngx-choosy/sparkle/position/global-position';
import { InsidePlacement } from '../../module/ngx-choosy/sparkle/models';

@Component({
  selector: 'app-sparkle-ref',
  templateUrl: './sparkle-ref.component.html'
})
export class SparkleRefComponent implements OnInit {
  ref: Sparkle<HelloComponent>;
  constructor(private sparkle: Sparkle<HelloComponent>) {}

  ngOnInit() {
    this.ref = this.sparkle.host(HelloComponent).overlay(
      new GlobalPosition({
        placement: InsidePlacement.CENTER,
        hostHeight: 'auto',
        hostWidth: 'auto'
      }),
      'abc'
    );
  }
  create() {
    this.ref.create();
  }
}
