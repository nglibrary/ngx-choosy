import { NgModule } from '@angular/core';

import { Host } from './host';
import { Overlay } from './overlay';
import { DomHelper } from './helper/dom';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [Host, Overlay, DomHelper]
})
export class SparkleModule {}
