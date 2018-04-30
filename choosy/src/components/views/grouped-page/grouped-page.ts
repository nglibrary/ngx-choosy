import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SimpleList } from '../simple-list/simple-list';
import { ChoosyOptions } from '../../../models';

@Component({
  selector: 'choosy-grouped-page-view',
  templateUrl: './grouped-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class GroupedPage extends SimpleList {
  selectedGroup = null;
  selectGroup(group) {
    this.selectedGroup = group;
  }
  removeGroup() {
    this.selectedGroup = null;
  }

  countSelected(list: ChoosyOptions) {
    return list.filter(l => l.state.selected).length;
  }
}
