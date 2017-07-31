import {
  AfterViewInit,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer,
  TemplateRef,
  ViewChild,
  ViewContainerRef
  } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as merge from 'deepmerge';
import { ChoosyDirective } from '../../classes';
import { ChoosyResultsComponent } from '../../components';
import { ChoosyRawOption, ChoosySingleSelectConfig } from '../../interfaces';
import { ChoosyConfigService, ChoosyManagerService } from '../../services';

@Directive({
  selector: 'input[choosySingleSelect]',
  exportAs: 'choosy',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChoosySingleSelectDirective),
    multi: true
  }]
})

export class ChoosySingleSelectDirective extends ChoosyDirective implements
  ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() options: Array<any> = [];
  @Input() config: ChoosySingleSelectConfig = {} as any;
  @Input() template: TemplateRef<any>;

  @Output() choosy: EventEmitter<any> = new EventEmitter<any>();

  private initialValue: any;
  constructor(
    public globalConfig: ChoosyConfigService,
    public elRef: ElementRef,
    public renderer: Renderer,
    public viewContainerRef: ViewContainerRef,
    public compFacResolver: ComponentFactoryResolver,
    public choosyManager: ChoosyManagerService
  ) {
    super();
    this.createChoosyInstance();
  }

  ngOnInit(): void {
    if (typeof this.options[0] === 'object' && !this.config.displayValue) {
      this.config.displayValue = Object.keys(this.options[0])[0];
    }
    this.config = this.globalConfig.getConfig(this.config) as any;
    this.elRef.nativeElement.readOnly = true;
    this.compIns.config = this.config;
    this.compIns.options = this.options;
  }

  ngAfterViewInit(): void {
    this.applyDropdownSpan(
      this.config.dropdown.size,
      this.elRef.nativeElement,
      this.config.dropdown.width
    );
    this.compIns.template = this.template;
    this.choosy.emit(this.prepareEvents(this.compIns.expose()));
    this.compIns.selections.subscribe((r: any) => {
      const val = this.config.displayValue ? r[this.config.displayValue] : r;
      this.setValue(val);
      this.onChange(r);
      this.compIns.close();
    });
    if (this.initialValue) {
      const val = this.config.displayValue
        ? this.initialValue[this.config.displayValue]
        : this.initialValue;
    }
  }

  ngOnDestroy(): void {
    this.destroyComp();
  }

  ngOnChanges(change: any): void {
    if (change.options && !change.options.firstChange) {
      this.options = change.options.currentValue;
      this.compIns.reloadOptions(this.options);
    }
    if (change.config) {
      this.config = this.compIns.config = this.globalConfig.getConfig(change.config.currentValue) as any;
    }
    // TODO merge original and dynamic config
  }

  @HostListener('document:click', ['$event'])
  documentClickEvent(event: Event): void {
    this.closeOnOutsideClick(this.elRef.nativeElement, event);
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event): void {
    this.closeOthersToggleThis();
  }

  @HostListener('window:resize', ['$event'])
  windowResize(event: Event): void {
    const { size, width } = this.config.dropdown;
    if (size == 'AUTO') {
      this.applyDropdownSpan(
        'AUTO',
        this.elRef.nativeElement,
        width
      );
    }
  }

  @HostListener('input', ['$event.target.value'])
  onChange = (_: any): void => { }

  @HostListener('blur', [])
  onTouched = (_: any): void => { }

  prepareEvents(componentEvent: any): void {
    return {
      ...componentEvent,
      clear: this.clear.bind(this)
    };
  }
  writeValue(value: any): void {
    if (!value) return;
    this.initialValue = value;
    const val = this.config.displayValue ? value[this.config.displayValue] : value;
    if (!value) {
      this.setValue(null);
      return;
    }
    this.setValue(val);
    this.onChange(val);
  }
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }

  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  isOpen(): boolean {
    return this.compIns.isOpened();
  }
  private setValue(value: any): void {
    this.renderer.setElementProperty(this.elRef.nativeElement, 'value', value);
  }

  private clear(): void {
    this.setValue(null);
    this.onChange(null);
    this.compIns.clearSelectedOptions();
  }
}
