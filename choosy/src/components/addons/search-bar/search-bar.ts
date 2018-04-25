import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'choosy-search-bar',
  template: `
  <div>
    <input type="search" placeholder="search" [ngModel]="keyword" (ngModelChange)="search.emit($event)">
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class SearchBar {
  @Output() search: EventEmitter<string> = new EventEmitter();
  keyword = '';
}
