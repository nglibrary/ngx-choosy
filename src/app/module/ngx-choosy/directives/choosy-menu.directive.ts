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
  selector: '.choosy-menu',
  exportAs: 'choosyMenuRef'
})
export class ChoosyMenuDirective {
  @Input() options: any[] = [];
  @Input() config: Partial<ChoosyConfig> = {};
  @Input() optionTpl: TemplateRef<any>;
  private choosyCompIns: ChoosyComponent;
  constructor(
    private hostService: ChoosyHostService,
    private renderer: Renderer2,
    private ElRef: ElementRef
  ) {}

  @HostListener('click')
  onFocus($event) {
    const b = {
      options: this.options,
      config: { ...this.config, type: 'menu' },
      optionTpl: this.optionTpl
    };
    this.choosyCompIns = this.hostService.init(ChoosyComponent as any, b, '');
    this.setPosition();
  }

  private setPosition() {
    this.hostService.renderer = this.renderer;
    this.hostService.setPosition(this.ElRef.nativeElement, 'FIXED', 300);
  }
}
