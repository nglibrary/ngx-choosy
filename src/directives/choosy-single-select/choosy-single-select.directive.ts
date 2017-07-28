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

  private componentRef: ComponentRef<ChoosyResultsComponent>;
  private initialValue: any;
  private compInstance: ChoosyResultsComponent;
  private static compInstances: any = [];

  constructor(
    private eRef: ElementRef,
    private renderer: Renderer,
    private viewContainerRef: ViewContainerRef,
    private compFacResolver: ComponentFactoryResolver
  ) {
    const factory = this.compFacResolver.resolveComponentFactory(ChoosyResultsComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory, 0);
    this.compInstance = this.componentRef.instance;
    ChoosySingleSelectDirective.compInstances.push(this.compInstance);
  }

  ngOnInit(): void {
    if (typeof this.options[0] === 'object' && !this.config.displayValue) {
      this.config.displayValue = Object.keys(this.options[0])[0];
    }
    this.eRef.nativeElement.readOnly = true;
    this.compInstance.config = this.config;
    this.compInstance.options = this.options;
  }

  ngAfterViewInit(): void {
    this.config.wrapInput ? this.wrapInput() : this.makeParentNodeRelative();
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
    this.compInstance.toggle();
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

  wrapInput(): void {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.height = `${this.eRef.nativeElement.offsetHeight}px`;
    this.eRef.nativeElement.parentNode.insertBefore(wrapper, this.eRef.nativeElement);
    wrapper.appendChild(this.eRef.nativeElement);
    wrapper.appendChild((this.componentRef as any).instance.elRef.nativeElement);
  }

  makeParentNodeRelative() {
    this.eRef.nativeElement.parentNode.style.position = 'relative';
  }

  onDocumentClick(event: any): void {
    if (
      event.target != this.eRef.nativeElement &&
      event.target != this.compInstance.elRef.nativeElement &&
      !this.compInstance.elRef.nativeElement.contains(event.target)
    ) {
      this.close();
    }
  }
  writeValue(value: any): void {
    if (!value) return;
    this.initialValue = value;
    const val = this.config.displayValue ? value[this.config.displayValue] : value;
    if (!value) {
      this.setValue(undefined);
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
