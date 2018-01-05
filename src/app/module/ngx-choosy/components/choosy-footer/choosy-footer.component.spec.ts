import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosyFooterComponent } from './choosy-footer.component';

describe('ChoosyFooterComponent', () => {
  let component: ChoosyFooterComponent;
  let fixture: ComponentFixture<ChoosyFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosyFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
