import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosyHeaderComponent } from './choosy-header.component';

describe('ChoosyHeaderComponent', () => {
  let component: ChoosyHeaderComponent;
  let fixture: ComponentFixture<ChoosyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
