import { Component, ChangeDetectionStrategy, TemplateRef, Input } from '@angular/core';
import { SimpleList } from '../simple-list/simple-list';

@Component({
  selector: 'choosy-split-view',
  templateUrl: './split.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class Split extends SimpleList {
  @Input() previewTpl: TemplateRef<any>;
  hoveredOptionValue = null;
  hover(value) {
    this.hoveredOptionValue = value;
  }
}
