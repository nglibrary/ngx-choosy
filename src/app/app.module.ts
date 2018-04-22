import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChoosyModule } from '../../choosy/src/choosy.module';
import { BlinkTestComponent } from './blink-test/blink-test.component';
import { MinimalComponent } from './blink-test/test-components/minimal';
import { LargeComponent } from './blink-test/test-components/large';
import { FormsModule } from '@angular/forms';
import { BlinkModule } from '@blink/core';


@NgModule({
  declarations: [
    AppComponent,
    BlinkTestComponent,
    MinimalComponent,
    LargeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChoosyModule,
    BlinkModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents: [ MinimalComponent, LargeComponent ]
})
export class AppModule {
}
