import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChoosyModule } from './module/ngx-choosy/ngx-choosy.module';

import { AppComponent } from './app.component';
import { X1SimpleArrayComponent } from './x1-simple-array/x1-simple-array.component';
import { ExampleSingleSelectComponent } from './example-single-select/example-single-select.component';
import { ChoosyComponent } from './demo/choosy/choosy.component';
import { ChoosyWithTplComponent } from './demo/choosy-with-tpl/choosy-with-tpl.component';
import { ChoosyObsInputComponent } from './demo/choosy-obs-input/choosy-obs-input.component';
import { ChoosyAddRemOptComponent } from './demo/choosy-add-rem-opt/choosy-add-rem-opt.component';
import { EnableDiableOptComponent } from './demo/enable-diable-opt/enable-diable-opt.component';
import { OutputValComponent } from './demo/output-val/output-val.component';
import { ActiveLoopComponent } from './demo/active-loop/active-loop.component';

@NgModule({
  declarations: [AppComponent, X1SimpleArrayComponent, ExampleSingleSelectComponent, ChoosyComponent, ChoosyWithTplComponent, ChoosyObsInputComponent, ChoosyAddRemOptComponent, EnableDiableOptComponent, OutputValComponent, ActiveLoopComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChoosyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
