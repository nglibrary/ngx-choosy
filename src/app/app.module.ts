import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChoosyModule } from './module/choosy/choosy.module';

import { AppComponent } from './app.component';
import { SparkleRefComponent } from './demo/sparkle-ref/sparkle-ref.component';
import { HelloComponent } from './demo/sparkle-ref/hello.component';

@NgModule({
  declarations: [AppComponent, HelloComponent, SparkleRefComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, ChoosyModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HelloComponent]
})
export class AppModule {}
