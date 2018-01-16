import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { ChoosyOption } from '../../models';
import { ChoosyListService } from '../../services/choosy-list.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-items',
  templateUrl: './choosy-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChoosyItemsComponent implements OnInit {
  @Input('ref') ref: any;
  private tpl: TemplateRef<any>;
  constructor(private listService: ChoosyListService) {}

  ngOnInit() {}
  trackByFn(index, item) {
    return item.uid;
  }
}
