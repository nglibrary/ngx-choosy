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
import { Option, Config } from '../../../models';
import { ListService } from '../../../core/services/list.service';
import { ConfigService } from '../../../core/services/config.service';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, AfterViewInit {
  @Input() options: Observable<any>;
  @Input() config: Config;
  @Input() optionTpl: TemplateRef<any>;
  @ViewChild('defaultOptionTpl', { read: TemplateRef })
  defaultOptionTpl;
  @ViewChild('checkboxDefaultOptionTpl', { read: TemplateRef })
  checkboxDefaultOptionTpl;
  @ViewChild('checkboxCustomOptionTpl', { read: TemplateRef })
  checkboxCustomOptionTpl;
  @HostBinding('style.maxHeight') height: string;

  private tpl: TemplateRef<any>;
  constructor(
    private listService: ListService,
    private configService: ConfigService,
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.config.type === 'multi-select' && this.config.multiselect.checkbox) {
      this.tpl = this.optionTpl ? this.checkboxCustomOptionTpl : this.checkboxDefaultOptionTpl;
    } else {
      this.tpl = this.optionTpl || this.defaultOptionTpl;
    }
    this.height = this.config.dropdown.height + 'px';
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
