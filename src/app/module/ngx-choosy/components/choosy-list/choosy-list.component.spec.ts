import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosyListComponent } from './choosy-list.component';

describe('ChoosyListComponent', () => {
  let component: ChoosyListComponent;
  let fixture: ComponentFixture<ChoosyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
