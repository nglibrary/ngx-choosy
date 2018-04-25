import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SimpleList } from '../simple-list/simple-list';

@Component({
  selector: 'choosy-grouped-list-view',
  templateUrl: './grouped-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class GroupedList extends SimpleList {}
