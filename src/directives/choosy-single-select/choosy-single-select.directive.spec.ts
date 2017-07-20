import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChoosyListComponent } from '../../components/choosy-list/choosy-list.component';
import { ChoosyResultsComponent } from '../../components/choosy-results/choosy-results.component';
import { ChoosySearchComponent } from '../../components/choosy-search/choosy-search.component';
import { ChoosyConfigService } from '../../services/choosy-config/choosy-config.service';
import { ChoosySingleSelectDirective } from './choosy-single-select.directive';

@Component({
  template: `<input type="text" [options]="['one','two']" choosySingleSelect>`
})
class TestComponent { }

@NgModule({
  imports: [CommonModule],
  declarations: [
    TestComponent,
    ChoosyResultsComponent,
    ChoosyListComponent,
    ChoosySearchComponent,
    ChoosySingleSelectDirective
  ],
  entryComponents: [ChoosyResultsComponent],
  providers: [ChoosyConfigService]
})
export class TestModule { }

describe('Directive: ChoosySingleInput', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
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
