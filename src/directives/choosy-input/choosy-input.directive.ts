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
import { ChoosyResultsComponent } from '../../components/choosy-results/choosy-results.component';
import { ChoosyRawOption } from '../../interfaces/index';

@Directive({
  selector: '[choosySingleSelect]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChoosyInputDirective),
    multi: true
  }]
})

export class ChoosyInputDirective implements
  ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() options: Array<any>;
  @Input() config: any = {};
  @Input() template: TemplateRef<any>;
  @Output() choosy: EventEmitter<any> = new EventEmitter<any>();
  componentRef: ComponentRef<ChoosyResultsComponent>;
  initialValue: any;
  constructor(
    private eRef: ElementRef,
    private renderer: Renderer,
    private viewContainerRef: ViewContainerRef,
    private compFacResolver: ComponentFactoryResolver
  ) {
    // this.wrapElement();
    const factory = this.compFacResolver.resolveComponentFactory(ChoosyResultsComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory, 0);
  }

  ngOnInit(): void {
    if (!this.options)
      throw new Error('Options not found!');
    else if (typeof this.options[0] === 'object' && !this.config.displayValue)
      throw new Error('"displayValue" config is manadatory of object options!');

    this.eRef.nativeElement.readOnly = true;
    this.componentRef.instance.config = merge(this.config, {
      dropdown: {
        inputWidth: this.eRef.nativeElement.offsetWidth
      }
    });
    this.componentRef.instance.options = this.options;
  }

  ngAfterViewInit(): void {
    this.componentRef.instance.template = this.template;
    this.choosy.emit(this.prepareEvents(this.componentRef.instance.expose()));
    this.componentRef.instance.selections.subscribe((r: any) => {
      const val = this.config.displayValue ? r[this.config.displayValue] : r;
      this.setValue(val);
      this.onChange(r);
      this.componentRef.instance.isOpen = false;
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
      this.componentRef.instance.reloadOptions(this.options);
    }
    if (change.config)
      this.componentRef.instance.config = change.config.currentValue;
  }

  @HostListener('document:click', ['$event'])
  documentClickEvent(event: Event): void {
    this.onDocumentClick(event);
  }

  @HostListener('click', ['$event'])
  clickEvent($event: Event): void {
    this.toggleDropdown($event);
  }

  @HostListener('input', ['$event.target.value'])
  onChange = (_: any): void => { /*empty*/ }

  @HostListener('blur', [])
  onTouched = (_: any): void => { /*empty*/ }

  prepareEvents(componentEvent: any): void {
    return {
      ...componentEvent,
      clear: this.clear.bind(this),
      selectItem: this.selectItem.bind(this)
    };
  }

  wrapInput(): void {
    const wrapper = document.createElement('div');
    this.eRef.nativeElement.parentNode.insertBefore(wrapper, this.eRef.nativeElement);
    wrapper.classList.add('dropdown__input-wrapper');
    wrapper.setAttribute('style', 'position:relative');
    wrapper.appendChild(this.eRef.nativeElement);
  }

  onDocumentClick(event: any): void {
    if (
      this.componentRef.instance.elRef.nativeElement.contains(event.target) ||
      this.eRef.nativeElement.contains(event.target)
    ) {
      // this.text = "clicked inside";
    } else {

      this.componentRef.instance.close(event);
    }

  }
  writeValue(value: any): void {
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

  openDropdown(): void {
    this.componentRef.instance.open(new Event('click'));
  }

  closeDropdown(): void {
    this.componentRef.instance.close(new Event('click'));
  }

  toggleDropdown(event: Event): void {
    this.componentRef.instance.toggle(event);
  }

  private setValue(value: any): void {
    this.renderer.setElementProperty(this.eRef.nativeElement, 'value', value);
  }

  private clear(): void {
    this.setValue(null);
    this.onChange(null);
    this.componentRef.instance.clearSelectedOptions();
  }

  private selectItem(option: ChoosyRawOption): void {
    this.setValue(option);
    this.onChange(option);
    this.componentRef.instance.selectOption(option);
  }
}
