import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChoosyModule } from './module/ngx-choosy/ngx-choosy.module';

import { AppComponent } from './app.component';
import { X1SimpleArrayComponent } from './x1-simple-array/x1-simple-array.component';
import { ChoosyComponent } from './demo/choosy/choosy.component';
import { ChoosyWithTplComponent } from './demo/choosy-with-tpl/choosy-with-tpl.component';
import { ChoosyObsInputComponent } from './demo/choosy-obs-input/choosy-obs-input.component';
import { ChoosyAddRemOptComponent } from './demo/choosy-add-rem-opt/choosy-add-rem-opt.component';
import { EnableDiableOptComponent } from './demo/enable-diable-opt/enable-diable-opt.component';
import { OutputValComponent } from './demo/output-val/output-val.component';
import { ActiveLoopComponent } from './demo/active-loop/active-loop.component';
import { ChipsComponent } from './demo/chips/chips.component';
import { FilterOutsideComponent } from './demo/filter-outside/filter-outside.component';
import { AutocompleteComponent } from './demo/autocomplete/autocomplete.component';
import { CheckboxSelectComponent } from './demo/checkbox-select/checkbox-select.component';
import { HeadboardComponent } from './demo/headboard/headboard.component';
import { FreestyleComponent } from './demo/freestyle/freestyle.component';
import { GroupbyComponent } from './demo/groupby/groupby.component';
import { OverlayComponent } from './demo/overlay/overlay.component';
import { TestComponent } from './demo/overlay/test.component';
import { DropdownDirectiveComponent } from './demo/dropdown-directive/dropdown-directive.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoosyComponent,
    ChoosyWithTplComponent,
    ChoosyObsInputComponent,
    ChoosyAddRemOptComponent,
    EnableDiableOptComponent,
    OutputValComponent,
    ActiveLoopComponent,
    ChipsComponent,
    FilterOutsideComponent,
    AutocompleteComponent,
    CheckboxSelectComponent,
    HeadboardComponent,
    FreestyleComponent,
    GroupbyComponent,
    OverlayComponent,
    TestComponent,
    DropdownDirectiveComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgxChoosyModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TestComponent]
})
export class AppModule {}
