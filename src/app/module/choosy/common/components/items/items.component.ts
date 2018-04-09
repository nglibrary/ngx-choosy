import { Component, OnInit, Input, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Option } from '../../../models';
import { ListService } from '../../../core/services/list.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-items',
  templateUrl: './items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent implements OnInit {
  @Input('ref') ref: any;
  private tpl: TemplateRef<any>;
  constructor(private listService: ListService) {}

  ngOnInit() {}
  trackByFn(index, item) {
    return item.uid;
  }
}
