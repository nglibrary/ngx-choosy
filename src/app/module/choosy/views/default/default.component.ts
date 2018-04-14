import { Component, OnInit, ElementRef } from '@angular/core';
import { ChoosyView, ChoosyOptions } from '../../core/choosy-view';
import { takeUntil } from 'rxjs/operators';
@ChoosyView({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-default-view',
  templateUrl: 'default.component.html'
})
export class DefaultViewComponent {
  @ChoosyOptions() opt;
  choosyInit() {
    this.opt.pipe(takeUntil(this.alive)).subscribe(a => {});
  }
}
