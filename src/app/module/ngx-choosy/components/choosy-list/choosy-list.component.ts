import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { ChoosyOption } from '../../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-list',
  templateUrl: './choosy-list.component.html',
  styleUrls: ['./choosy-list.component.css']
})
export class ChoosyListComponent implements OnInit {
  @Input() options: ChoosyOption[] = [];
  @Input() optionTpl: TemplateRef<any>;
  @ViewChild('defaultOptionTpl', { read: TemplateRef })
  defaultOptionTpl;

  private tpl: TemplateRef<any>;
  constructor() {}

  ngOnInit() {
    this.tpl = this.optionTpl || this.defaultOptionTpl;
    console.log('tpl', this.tpl);
  }
}
