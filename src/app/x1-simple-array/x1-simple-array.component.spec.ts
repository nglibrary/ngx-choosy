import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { X1SimpleArrayComponent } from './x1-simple-array.component';

describe('X1SimpleArrayComponent', () => {
  let component: X1SimpleArrayComponent;
  let fixture: ComponentFixture<X1SimpleArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ X1SimpleArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X1SimpleArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
