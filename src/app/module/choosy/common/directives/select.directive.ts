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
import { Sparkle } from '../../../sparkle/sparkle';
import { SparkleRef } from '../../../sparkle/sparke-ref';
import { DefaultViewComponent } from '../../views/default/default.component';
import { takeUntil, filter } from 'rxjs/operators';

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
export class SelectDirective implements ControlValueAccessor, OnInit {
  hostIns: ComponentHost<ChoosyComponent>;
  overlayRef: OverlayInstance;
  choosy: ChoosyComponent;
  @Input() options: any[] = [];
  @Input() config: Partial<Config> = {};
  @Input() optionTpl: TemplateRef<any>;
  @Output() selected: EventEmitter<any> = new EventEmitter();
  value: any = null;
  instanceID: string = null;
  sparkleIns: Sparkle<ChoosyComponent>;
  ref: SparkleRef<ChoosyComponent>;
  private choosyCompIns: ChoosyComponent;
  private changeFn: Function;
  private optionSelected: Subject<any> = new Subject();
  private alive: Subject<any> = new Subject();
  constructor(
    private configService: ConfigService,
    private sparkle: Sparkle<DefaultViewComponent>,
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
    this.open();
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

  ngAfterViewInit() {
    this.createChoosy();
  }

  ngOnDestroy() {
    this.alive.next(true);
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
    const props = {
      options: this.options,
      config: this.config,
      instanceID: this.insID || 'abc'
      // view: HelloComponent
    };
    const relative = new RelativePosition({
      pos: OutsidePlacement.BOTTOM,
      src: this.elRef.nativeElement,
      hostWidth: 'auto',
      autoUpdate: true
    });

    this.sparkleIns = this.sparkle.host(DefaultViewComponent, props).overlay(relative);
  }

  open() {
    this.ref = this.sparkleIns.create().open();
    console.log(`SelectDirective opened: `, this.ref.c);
    this.choosy = this.ref.compIns.component;
    this.choosy.listService.setOptionAsSelected(this.value);
    this.choosy.events.pipe(filter(x => x.name === 'optionSelected'), takeUntil(this.alive)).subscribe(x => {
      this.optionSelected.next(x.value);
      console.log('its subscribed...');
    });
  }

  private destroyChoosy() {
    this.alive.next(true);
    this.ref.close();
    this.choosy = null;
  }
}
