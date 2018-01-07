import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-header',
  templateUrl: './choosy-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChoosyHeaderComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  keyword = '';
  constructor() {}

  ngOnInit() {}
  onSearch(e) {
    this.search.emit(e);
  }
}
