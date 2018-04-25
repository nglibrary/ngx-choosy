import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlinkTestComponent } from './blink-test/blink-test.component';
import { MinimalComponent } from './blink-test/test-components/minimal';
import { LargeComponent } from './blink-test/test-components/large';
import { FormsModule } from '@angular/forms';
import { BlinkModule } from '@blink/core';
import { MixinTestComponent } from './mixin-test/mixin-test.component';
import { ChoosyModule } from '../../choosy/src/choosy.module';
import { ChoosyTestComponent } from './choosy-test/choosy-test.component';

@NgModule({
  declarations: [
    AppComponent,
    BlinkTestComponent,
    MinimalComponent,
    LargeComponent,
    MixinTestComponent,
    ChoosyTestComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ChoosyModule.forRoot(), BlinkModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MinimalComponent, LargeComponent]
})
export class AppModule {}
