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
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ChoosyOption, ChoosyConfig } from '../../../models';
import { OptionsService } from '../../../services/options.service';
import { ConfigService } from '../../../services/config.service';
import { Observable } from 'rxjs/Observable';
import { BaseView } from '../base-view';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

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
  @Output() hoveredOption: EventEmitter<any> = new EventEmitter();
  @ViewChild('defaultOptionTpl', { read: TemplateRef })
  defaultOptionTpl;
  @ViewChild('checkboxDefaultOptionTpl', { read: TemplateRef })
  checkboxDefaultOptionTpl;
  @ViewChild('checkboxCustomOptionTpl', { read: TemplateRef })
  checkboxCustomOptionTpl;
  @HostBinding('style.maxHeight') height: string;
  lastSelectedOption: ChoosyOption;
  name = 'simple-list';
  alive: Subject<any> = new Subject();

  private tpl: TemplateRef<any>;
  constructor(
    private optionsService: OptionsService,
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
    this.options.pipe(takeUntil(this.alive)).subscribe(x => {
      if ((this.cdRef as any).destroyed) {
        return;
      }
      this.cdRef.detectChanges();
    });

    this.optionsService
      .getLastSelectedOption()
      .pipe(takeUntil(this.alive))
      .subscribe(opt => (this.lastSelectedOption = opt));
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
    (this.optionsService as any)[method](option);
  }

  hover(option, status) {
    let opt = option;
    if (!status && this.lastSelectedOption) {
      opt = this.lastSelectedOption;
    } else if (!status && !this.lastSelectedOption) {
      opt = null;
    }
    this.hoveredOption.emit(opt);
    // this.optionsService.updateOptionHoverState(option, status);
  }

  ngOnDestroy() {
    this.alive.next(true);
    this.alive.complete();
  }
}
