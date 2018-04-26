import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { ChoosyOption, ChoosyConfig } from '../../../models';
import { OptionsService } from '../../../services/options.service';
import { ConfigService } from '../../../services/config.service';
import { Observable } from 'rxjs/Observable';
import { BaseView } from '../base-view';

@Component({
  selector: 'choosy-simple-list-view',
  templateUrl: './simple-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class SimpleList extends BaseView implements OnInit, AfterViewInit {
  @Input() options: Observable<any>;
  @Input() config: ChoosyConfig;
  @Input() optionTpl: TemplateRef<any>;
  @ViewChild('defaultOptionTpl', { read: TemplateRef })
  defaultOptionTpl;
  @ViewChild('checkboxDefaultOptionTpl', { read: TemplateRef })
  checkboxDefaultOptionTpl;
  @ViewChild('checkboxCustomOptionTpl', { read: TemplateRef })
  checkboxCustomOptionTpl;
  @HostBinding('style.maxHeight') height: string;
  name = 'simple-list';

  private tpl: TemplateRef<any>;
  constructor(
    private listService: OptionsService,
    private configService: ConfigService,
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.init();
    if (this.config.multiSelect.enable && this.config.multiSelect.checkbox) {
      this.tpl = this.optionTpl ? this.checkboxCustomOptionTpl : this.checkboxDefaultOptionTpl;
    } else {
      this.tpl = this.optionTpl || this.defaultOptionTpl;
    }
    this.height = this.config.dropDown.height + 'px';
    // todo: refactor
    this.options.subscribe(x => {
      if ((this.cdRef as any).destroyed) {
        return;
      }
      this.cdRef.detectChanges();
    });
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
