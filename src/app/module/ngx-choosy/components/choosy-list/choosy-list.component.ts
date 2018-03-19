import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef
} from '@angular/core';
import { ChoosyOption, ChoosyConfig } from '../../models';
import { ChoosyListService } from '../../services/choosy-list.service';
import { ChoosyConfigService } from '../../services/choosy-config.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-list',
  templateUrl: './choosy-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChoosyListComponent implements OnInit {
  @Input() options: any;
  @Input() config: ChoosyConfig;
  @Input() optionTpl: TemplateRef<any>;
  @ViewChild('defaultOptionTpl', { read: TemplateRef })
  defaultOptionTpl;
  @HostBinding('style.maxHeight') height: string;

  private tpl: TemplateRef<any>;
  constructor(
    private listService: ChoosyListService,
    private configService: ChoosyConfigService,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.tpl = this.optionTpl || this.defaultOptionTpl;
    this.height = this.config.dropdown.height + 'px';
  }
  ngAfterViewInit() {
    const scollEl = this.elRef.nativeElement;
    const targetEl = this.elRef.nativeElement.querySelector('.selected');
    if (!targetEl) {
      return;
    }
    scollEl.scrollTop = targetEl.offsetTop;
  }
  trackByFn(index, item) {
    return item.uid;
  }
  selection(option, state) {
    if (state.disabled) {
      return;
    }
    const method = state.selected ? 'clearSelectedOption' : 'selectOption';
    (this.listService as any)[method](option);
  }
}
