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
  selector: 'choosy-list',
  templateUrl: './choosy-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChoosyListComponent implements OnInit {
  @Input() options: any;
  @Input() optionTpl: TemplateRef<any>;
  @ViewChild('defaultOptionTpl', { read: TemplateRef })
  defaultOptionTpl;

  private tpl: TemplateRef<any>;
  constructor(private listService: ChoosyListService) {}

  ngOnInit() {
    this.tpl = this.optionTpl || this.defaultOptionTpl;
  }
  trackByFn(index, item) {
    return item.uid;
  }
  select(e) {
    this.listService.selectOption(e);
  }
}
