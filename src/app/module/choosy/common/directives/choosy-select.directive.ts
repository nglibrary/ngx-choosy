import {
  Directive,
  HostListener,
  Input,
  TemplateRef,
  Renderer2,
  HostBinding,
  ElementRef,
  forwardRef,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ChoosyComponent } from '../../core/components/choosy/choosy.component';
import { Config } from '../../models';
import { ConfigService } from '../../core/services/config.service';
import { Overlay } from '../../../sparkle/overlay';
import { OverlayInstance } from '../../../sparkle/overlay-ins';
import { RelativePosition } from '../../../sparkle/position/relative-position';
import { ComponentHost } from '../../../sparkle/host';
import { ComponentType, OutsidePlacement, InsidePlacement } from '../../../sparkle/models';
import { ComponentInstance } from '../../../sparkle/component-ins';
import { Subject } from 'rxjs/Subject';
import { GlobalPosition } from '../../../sparkle/position/global-position';

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
  hostIns: ComponentHost<ChoosyComponent>;
  overlayRef: OverlayInstance;
  choosy: ChoosyComponent;
  @Input() options: any[] = [];
  @Input() config: Partial<Config> = {};
  @Input() optionTpl: TemplateRef<any>;
  @Output() selected: EventEmitter<any> = new EventEmitter();
  value: any = null;
  instanceID: string = null;
  private choosyCompIns: ChoosyComponent;
  private changeFn: Function;
  private optionSelected: Subject<any> = new Subject();
  constructor(
    private configService: ConfigService,
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
    if (this.overlayRef) {
      return;
    }
    this.createChoosy();
  }

  @HostListener('blur')
  onBlur($event) {
    // this.destroyChoosy();
  }
  @HostListener('keyup', ['$event'])
  onKeyup(e) {
    if (this.choosy) {
      this.choosy.onSearch(e.target.value);
    }
    // this.overlay.destroy();
  }

  ngOnInit() {
    this.config = this.configService.mergeAllWithDefault(this.config, { type: 'select' });
    this.optionSelected.subscribe(x => {
      this.writeValue(x);
      this.destroyChoosy();

      // this.selected.emit(x);
    });
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
    // this.overlayRef = this.overlay.create(
    //   new GlobalPosition({
    //     placement: InsidePlacement.BOTTOM,
    //     hostHeight: 200,
    //     hostWidth: 200,
    //     offset: 20
    //   })
    // );
    // this.insID = this.overlayRef.id;
    // this.hostIns = this.overlayRef.attachComponent(ChoosyComponent, {
    //   options: this.options,
    //   config: this.config,
    //   instanceID: this.insID
    // });
    // this.choosy = this.hostIns.getCompIns().component;
    // this.choosy.listService.setOptionAsSelected(this.value);
    // this.choosy.events.filter(x => x.name === 'optionSelected').subscribe(x => this.optionSelected.next(x.value));
  }

  private destroyChoosy() {
    this.overlayRef.destroy();
    this.overlayRef = null;
    this.choosy = null;
  }
}
