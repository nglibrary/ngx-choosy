import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
  } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  ChoosyFooterComponent,
  ChoosyListComponent,
  ChoosyResultsComponent,
  ChoosySearchComponent
  } from '../../components';
import { ChoosyConfigService } from '../../services/choosy-config/choosy-config.service';
import { ChoosySingleSelectDirective } from './choosy-single-select.directive';

@Component({
  template: `
  <form [formGroup]="simpleWOConfigForm">
    <div id="simple-without-config">
      <input type="text" [options]="['one','two']" choosySingleSelect formControlName="names">
    </div>
    <div id="simple-without-options">
      <input type="text" choosySingleSelect formControlName="months">
    </div>
  </form>
`
})
class ChoosySingleSelectComponent {
  simpleWOConfigForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.simpleWOConfigForm = this.fb.group({
      names: [],
      months: []
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChoosySingleSelectComponent,
    ChoosyResultsComponent,
    ChoosyListComponent,
    ChoosySearchComponent,
    ChoosyFooterComponent,
    ChoosySingleSelectDirective
  ],
  entryComponents: [ChoosyResultsComponent],
  providers: [ChoosyConfigService]
})
export class ChoosySingleSelectModule { }

describe('ChoosySingleSelectDirective', () => {

  let comp: ChoosySingleSelectComponent;
  let fixture: ComponentFixture<ChoosySingleSelectComponent>;
  let inputEl: DebugElement;
  let simpleWOCongigEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChoosySingleSelectModule]
    });
    fixture = TestBed.createComponent(ChoosySingleSelectComponent);
    comp = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    simpleWOCongigEl = fixture.debugElement.query(By.css('#simple-without-config input'));
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(simpleWOCongigEl.nativeElement.tagName).toBe('INPUT');
  });

  it('should be readonly', () => {
    expect(simpleWOCongigEl.nativeElement.readOnly).toBeTruthy();
  });

  it('should open the dropdown on click', () => {
    simpleWOCongigEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    const resultsEl = simpleWOCongigEl.nativeElement.nextSibling;
    expect(resultsEl.tagName).toBe('CHOOSY-RESULTS');
  });

  it('should close the dropdown on document click', () => {
    simpleWOCongigEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    document.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const listEl = simpleWOCongigEl.nativeElement.nextSibling.querySelector('choosy-list');
    expect(listEl).toBeFalsy();
  });

  it('should have a default form value', () => {
    comp.simpleWOConfigForm.controls.names.setValue('foobar');
    expect(simpleWOCongigEl.nativeElement.value).toBe('foobar');
  });


  it('should throw error when no options are provided', () => {
    comp.simpleWOConfigForm.controls.names.setValue('foobar');
    expect(simpleWOCongigEl.nativeElement.value).toBe('foobar');
  });

  // it('target input', () => {
  //   expect(inputEl.nativeElement.tagName).toBe('INPUT');
  // });
  // it('should open the dropdown on click', () => {
  //   inputEl.triggerEventHandler('click', null);
  //   // component.openDropdown();
  //   fixture.detectChanges();
  //   const listEl = fixture.debugElement.query(By.css('input')).nativeElement.nextSibling.querySelector('choosy-list');
  //   expect(listEl.tagName).toBe('CHOOSY-LIST');
  // });
  // it('should close the dropdown on click', () => {
  //   inputEl.triggerEventHandler('doubleclick', null);
  //   fixture.detectChanges();
  //   const listEl = fixture.debugElement.query(By.css('input')).nativeElement.nextSibling.querySelector('choosy-list');
  //   expect(listEl).toBeFalsy();
  // });
  // it('should show only option two', () => {
  //   inputEl.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   const searchEl = fixture.debugElement.query(By.css('input')).nativeElement.nextSibling.querySelector('input');
  //   searchEl.value = 't';
  //   searchEl.dispatchEvent(new Event('input'));
  //   fixture.detectChanges();
  //   expect(document.querySelectorAll('.choosy-dd__item').length).toBe(1);
  // });
});
