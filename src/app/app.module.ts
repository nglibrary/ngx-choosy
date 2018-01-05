import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChoosyModule } from './module/ngx-choosy/ngx-choosy.module';

import { AppComponent } from './app.component';
import { X1SimpleArrayComponent } from './x1-simple-array/x1-simple-array.component';

@NgModule({
  declarations: [AppComponent, X1SimpleArrayComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChoosyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
