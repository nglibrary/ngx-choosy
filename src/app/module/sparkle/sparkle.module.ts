import { NgModule } from '@angular/core';

import { ComponentHost } from './host';
import { DomHelper } from './helper/dom';
import { Messenger } from './helper/messenger';
import { SparkleRef } from './sparke-ref';
import { Sparkle } from './sparkle';
import { OverlayInstance } from './overlay-ins';
import { Utils } from './helper/utils';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ComponentHost,
    OverlayInstance,
    DomHelper,
    Utils,
    Messenger,
    Sparkle
    // {
    //   provide: SparkleRef,
    //   useFactory: () => new SparkleRef(),
    //   deps: []
    // }
  ]
})
export class SparkleModule {}
