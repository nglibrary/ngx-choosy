import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  tick
  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChoosySearchComponent } from './choosy-search.component';

describe('ChoosySearchComponent', () => {
  let comp: ChoosySearchComponent;
  let fixture: ComponentFixture<ChoosySearchComponent>;
  let inputEl;

  beforeEach(() => {
    const elementRefStub = {};
    TestBed.configureTestingModule({
      declarations: [ChoosySearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ElementRef, useValue: elementRefStub }
      ]
    });
    fixture = TestBed.createComponent(ChoosySearchComponent);
    comp = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });
  it('input is auto focused', async(() => {
    spyOn(inputEl.nativeElement, 'focus');
    (comp as any).config = { search: { autoFocus: true } };
    comp.ngAfterViewInit();
    fixture.detectChanges();
    expect(inputEl.nativeElement.focus).toHaveBeenCalled();
  }));
  it('should emit input keyword', () => {
    let kw;
    comp.search.subscribe(r => kw = r);
    inputEl.nativeElement.value = 'foobar';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(kw).toEqual('foobar');
  })
});
