import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'choosy-filter-widget',
  template: `
  <div>
    <input type="text" placeholder="search" [ngModel]="keyword" (ngModelChange)="search.emit($event)">
    <i class="choosy-icon choosy-icon-search"></i>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class FilterWidget {
  @Output() search: EventEmitter<string> = new EventEmitter();
  keyword = '';
}
