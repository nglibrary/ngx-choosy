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
import { ChoosyResultsComponent } from '../../components';
import { ChoosyRawOption, ChoosySingleSelectConfig } from '../../interfaces';
import { ChoosyConfigService } from '../../services';

@Directive({
  selector: 'input[choosySingleSelect]',
  exportAs: 'choosy',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChoosySingleSelectDirective),
    multi: true
  }]
})

export class ChoosySingleSelectDirective implements
  ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() options: Array<any> = [];
  @Input() config: ChoosySingleSelectConfig = {} as any;
  @Input() template: TemplateRef<any>;

  @Output() choosy: EventEmitter<any> = new EventEmitter<any>();

  private id: string;
  private componentRef: ComponentRef<ChoosyResultsComponent>;
  private initialValue: any;
  private compInstance: ChoosyResultsComponent;
  private compEl: HTMLElement;
  private static compInstances: any = [];

  constructor(
    private globalConfig: ChoosyConfigService,
    private eRef: ElementRef,
    private renderer: Renderer,
    private viewContainerRef: ViewContainerRef,
    private compFacResolver: ComponentFactoryResolver
  ) {
    const factory = this.compFacResolver.resolveComponentFactory(ChoosyResultsComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory, 0);
    this.compInstance = this.componentRef.instance;
    this.compEl = this.componentRef.instance.elRef.nativeElement;
    this.id = Math.random().toString(36).substr(2, 5);
    ChoosySingleSelectDirective.compInstances.push({ comp: this.compInstance, id: this.id });
  }

  ngOnInit(): void {
    if (typeof this.options[0] === 'object' && !this.config.displayValue) {
      this.config.displayValue = Object.keys(this.options[0])[0];
    }
    this.config = this.globalConfig.getConfig(this.config) as any;
    this.eRef.nativeElement.readOnly = true;
    this.compInstance.config = this.config;
    this.compInstance.options = this.options;
  }

  ngAfterViewInit(): void {
    this.setSize(this.config.dropdown.size);
    this.compInstance.template = this.template;
    this.choosy.emit(this.prepareEvents(this.compInstance.expose()));
    this.compInstance.selections.subscribe((r: any) => {
      const val = this.config.displayValue ? r[this.config.displayValue] : r;
      this.setValue(val);
      this.onChange(r);
      this.compInstance.close();
    });
    if (this.initialValue) {
      const val = this.config.displayValue
        ? this.initialValue[this.config.displayValue]
        : this.initialValue;
    }
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

  ngOnChanges(change: any): void {
    if (change.options && !change.options.firstChange) {
      this.options = change.options.currentValue;
      this.compInstance.reloadOptions(this.options);
    }
    if (change.config)
      this.compInstance.config = change.config.currentValue;
  }

  @HostListener('document:click', ['$event'])
  documentClickEvent(event: Event): void {
    this.onDocumentClick(event);
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event): void {
    ChoosySingleSelectDirective.compInstances.forEach((ins: any) => {
      if (ins.id != this.id) ins.comp.close();
      else ins.comp.toggle();
    });
  }

  @HostListener('window:resize', ['$event'])
  windowResize(event: Event): void {
    if (this.config.dropdown.size == 'AUTO') {
      this.setSize('AUTO');
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

  setSize(mode: string) {
    const fixedWidth = this.config.dropdown.width;
    const { offsetWidth, offsetHeight } = this.eRef.nativeElement;
    const compEl = this.compEl;

    if (mode == 'AUTO') {
      const style = `width:${offsetWidth}px;top:${offsetHeight}px`;
      this.renderer.setElementProperty(this.compEl, 'style', style);
    }
    else if (mode == 'FIXED') {
      const style = `width:${fixedWidth}px;top:${offsetHeight}px`;
      this.renderer.setElementProperty(this.compEl, 'style', style);
    }
    else if (mode == 'PARENT') {
      this.renderer.setElementStyle(this.eRef.nativeElement.parentNode, 'position', 'relative');
    }
    else if (mode == 'WRAP') { }
  }

  onDocumentClick(event: any): void {
    if (
      event.target != this.eRef.nativeElement &&
      event.target != this.compEl &&
      !this.compEl.contains(event.target)
    ) {
      this.close();
    }
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
    return this.compInstance.isOpened();
  }
  open(): void {
    this.compInstance.open();
  }
  close(): void {
    this.compInstance.close();
  }

  toggle(): void {
    this.compInstance.toggle();
  }

  private setValue(value: any): void {
    this.renderer.setElementProperty(this.eRef.nativeElement, 'value', value);
  }

  private clear(): void {
    this.setValue(null);
    this.onChange(null);
    this.compInstance.clearSelectedOptions();
  }
}
