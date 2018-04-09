import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosyComponent } from './choosy.component';

describe('ChoosyComponent', () => {
  let component: ChoosyComponent;
  let fixture: ComponentFixture<ChoosyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
