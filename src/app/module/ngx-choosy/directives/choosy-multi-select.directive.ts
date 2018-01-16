import {
  Directive,
  HostListener,
  Input,
  TemplateRef,
  Renderer2,
  ElementRef
} from '@angular/core';
import { ChoosyHostService } from '../services/choosy-host.service';
import { ChoosyComponent } from '../components/choosy/choosy.component';
import { ChoosyConfig } from '../models';
import { ChoosyListService } from '../services/index';

@Directive({
  selector:
    // tslint:disable-next-line:directive-selector
    'input[choosyMultiSelect],input[choosy-multi-select],input.choosy-multi-select',
  exportAs: 'choosyMultiSelectRef'
})
export class ChoosyMultiSelectDirective {
  @Input() options: any[] = [];
  @Input() config: Partial<ChoosyConfig> = {};
  @Input() optionTpl: TemplateRef<any>;
  private choosyCompIns: ChoosyComponent;
  constructor(
    public listService: ChoosyListService,
    private hostService: ChoosyHostService,
    private renderer: Renderer2,
    private ElRef: ElementRef
  ) {}

  @HostListener('focus')
  onFocus($event) {
    const b = {
      options: this.options,
      config: { ...this.config, type: 'select' },
      optionTpl: this.optionTpl
    };
    this.choosyCompIns = this.hostService.init(ChoosyComponent as any, b, '');
    this.setPosition();
  }
  @HostListener('blur')
  onBlur($event) {
    // this.hostService.destroy();
  }
  private setPosition() {
    this.hostService.renderer = this.renderer;
    this.hostService.setPosition(this.ElRef.nativeElement, 'FIXED', 300);
  }
}
