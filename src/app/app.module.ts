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
import { HomeComponent } from './pages/home/home.component';
import { BasicComponent } from './choosy-demo/basic/basic.component';
import { MultiselectComponent } from './choosy-demo/multiselect/multiselect.component';
import { GroupComponent } from './choosy-demo/group/group.component';
import { AutocompleteComponent } from './choosy-demo/autocomplete/autocomplete.component';
import { CheckboxComponent } from './choosy-demo/checkbox/checkbox.component';
import { IconicComponent } from './choosy-demo/iconic/iconic.component';
import { PreviewComponent } from './choosy-demo/preview/preview.component';
import { BasicSelectComponent } from './choosy-demo/basic-select/basic-select.component';
import { BasicButtonComponent } from './choosy-demo/basic-button/basic-button.component';
import { SectionComponent } from './choosy-utils/section/section.component';
import { CustomTemplateComponent } from './choosy-demo/custom-template/custom-template.component';

@NgModule({
  declarations: [
    AppComponent,
    BlinkTestComponent,
    MinimalComponent,
    LargeComponent,
    MixinTestComponent,
    ChoosyTestComponent,
    HomeComponent,
    BasicComponent,
    MultiselectComponent,
    GroupComponent,
    AutocompleteComponent,
    CheckboxComponent,
    IconicComponent,
    PreviewComponent,
    BasicSelectComponent,
    BasicButtonComponent,
    SectionComponent,
    CustomTemplateComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ChoosyModule.forRoot(), BlinkModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MinimalComponent, LargeComponent]
})
export class AppModule {}
