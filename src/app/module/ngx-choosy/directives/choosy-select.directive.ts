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

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[choosySelect],input[choosy-select],input.choosy-select',
  exportAs: 'choosySelectRef'
})
export class ChoosySelectDirective {
  @Input() options: any[] = [];
  @Input() config: Partial<ChoosyConfig> = {};
  @Input() optionTpl: TemplateRef<any>;
  private choosyCompIns: ChoosyComponent;
  constructor(
    private hostService: ChoosyHostService,
    private renderer: Renderer2,
    private ElRef: ElementRef
  ) {}

  @HostListener('focus')
  onFocus($event) {
    console.log('injected');
    const b = {
      options: this.options,
      config: { ...this.config, type: 'select' },
      optionTpl: this.optionTpl
    };
    this.choosyCompIns = this.hostService.init(ChoosyComponent as any, b);
    this.setPosition();
    console.log('this.choosyCompIns ', this.choosyCompIns);
  }
  @HostListener('blur')
  onBlur($event) {
    console.log('ejected');
    // this.hostService.destroy();
  }
  private setPosition() {
    console.log('renderer', this.ElRef.nativeElement);
    this.hostService.renderer = this.renderer;
    this.hostService.setPosition(this.ElRef.nativeElement, 'FIXED', 300);
  }
}
