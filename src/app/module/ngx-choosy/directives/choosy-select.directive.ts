import {
  Directive,
  HostListener,
  Input,
  TemplateRef,
  Renderer2,
  HostBinding,
  ElementRef,
  forwardRef,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ChoosyComponent } from '../components/choosy/choosy.component';
import { ChoosyConfig } from '../models';
import { ChoosyConfigService } from '../services';
import { Overlay } from '../sparkle/overlay';
import { OverlayInstance } from '../sparkle/overlay-instance';
import { RelativePosition } from '../sparkle/position/relative-position';
import { Host } from '../sparkle/host';
import { ComponentType, OutsidePlacement } from '../sparkle/models';
import { ComponentInstance } from '../sparkle/component-instance';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[choosySelect],input[choosy-select],input.choosy-select',
  exportAs: 'choosySelectRef',
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => ChoosySelectDirective),
    //   multi: true
    // }
  ]
})
export class ChoosySelectDirective implements ControlValueAccessor, OnInit {
  hostIns: Host<ChoosyComponent>;
  overlayRef: OverlayInstance;
  @Input() options: any[] = [];
  @Input() config: Partial<ChoosyConfig> = {};
  @Input() optionTpl: TemplateRef<any>;
  value: any = null;
  instanceID: string = null;
  private choosyCompIns: ChoosyComponent;
  private changeFn: Function;
  constructor(
    private configService: ChoosyConfigService,
    private overlay: Overlay,
    private renderer: Renderer2,
    private elRef: ElementRef,
    public model: NgControl
  ) {}

  @HostBinding('attr.data-choosy-instance-id') insID: string;

  @HostListener('document:click', ['$event'])
  documentClickEvent(event: Event): void {
    //  todo
  }

  @HostListener('focus')
  onFocus($event) {
    if (this.overlayRef) return;
    this.createChoosy();
  }

  @HostListener('blur')
  onBlur($event) {
    // this.overlayRef.destroy();
  }
  @HostListener('keyup', ['$event'])
  onKeyup($event) {
    this.choosyCompIns.listService.filterOptions($event.target.value);
    // this.overlay.destroy();
  }

  ngOnInit() {
    this.config = this.configService.mergeAllWithDefault(this.config, { type: 'select' });
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
      this.renderer.setProperty(this.elRef.nativeElement, 'value', this.getValue(value));
    }
  }
  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }
  registerOnTouched(fn: any): void {}

  private getValue(value, key = this.config.displayValue) {
    if (typeof key === 'function') {
      return key(value);
    }
    // if (key) {
    //   let v = value;
    //   key.split('.').map(a => (v = v[a]));
    //   value = v;
    // }
    return value;
  }

  private createChoosy() {
    this.overlayRef = this.overlay.create(
      new RelativePosition({
        src: this.elRef.nativeElement,
        pos: OutsidePlacement.BOTTOM
      })
    );
    this.insID = this.overlayRef.id;
    this.hostIns = this.overlayRef.attachComponent(ChoosyComponent, {
      options: this.options,
      config: this.config,
      instanceID: this.insID
    });
    this.hostIns.getCompIns().addProps({ config: this.config });
  }
}
