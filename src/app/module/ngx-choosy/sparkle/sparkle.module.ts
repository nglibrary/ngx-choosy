import { NgModule } from '@angular/core';

import { Host } from './host';
import { Overlay } from './overlay';
import { DomHelper } from './helper/dom';
import { Messenger } from './helper/messenger';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [Host, Overlay, DomHelper, Messenger]
})
export class SparkleModule {}
