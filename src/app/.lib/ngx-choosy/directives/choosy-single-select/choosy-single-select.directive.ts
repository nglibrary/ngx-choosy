import {
  AfterViewInit,
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import * as merge from 'deepmerge';
import { ChoosyDirective } from '../../classes';
import { ChoosyResultsComponent } from '../../components';
import { ChoosyRawOption, ChoosySingleSelectConfig } from '../../interfaces';
import {
  ChoosyConfigService,
  ChoosyDomService,
  ChoosyManagerService
} from '../../services';
import { ChoosyComponentBuilderService } from '../../services/choosy-component-builder/choosy-component-builder.service';
import { NgControl } from '@angular/forms/';

@Directive({
  selector: 'input[choosySingleSelect]',
  exportAs: 'choosy',
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => ChoosySingleSelectDirective),
    //   multi: true
    // }
  ]
})
export class ChoosySingleSelectDirective {
  @Input() options: Array<any> = [];
  @Input() config: ChoosySingleSelectConfig = {} as any;
  @Input() template: TemplateRef<any>;

  @Output() choosy: EventEmitter<any> = new EventEmitter<any>();

  private initialValue: any;
  constructor(
    public globalConfig: ChoosyConfigService,
    public elRef: ElementRef,
    public renderer: Renderer2,
    public vcRef: ViewContainerRef,
    public choosyManager: ChoosyManagerService,
    public domService: ChoosyDomService,
    public builder: ChoosyComponentBuilderService,
    public ctrl: NgControl
  ) {
    // super();
    // builder.vcRef = this.vcRef;
    // this.insID = this.generateInsID();
    // this.builder.initiateComponent(this.insID);
    // domService.renderer = this.renderer;
  }

  @HostListener('input', ['$event'])
  onEvent($event) {
    const valueToTransform = this.elRef.nativeElement.value;
    // do something with the valueToTransform
    this.ctrl.control.setValue('aa');
    this.elRef.nativeElement.value = 'bb';
    console.log('ctrl', this.ctrl);
  }

  // ngOnInit(): void {
  //   if (typeof this.options[0] === 'object' && !this.config.displayValue) {
  //     this.config.displayValue = Object.keys(this.options[0])[0];
  //   }
  //   this.config = this.globalConfig.getLocalConfig(this.config) as any;
  //   this.elRef.nativeElement.readOnly = true;
  //   // this.compIns.config = this.config;
  //   // this.compIns.options = this.options;
  //   this.builder.setComponentInputs({
  //     config: this.config,
  //     options: this.options
  //   });
  //   this.builder.attachComponent();
  //   this.compIns = this.builder.getComponentIns();
  //   this.compEl = this.builder.getComponentView();
  // }

  // ngAfterViewInit(): void {
  //   this.domService.setPosition(
  //     this.elRef.nativeElement,
  //     this.compEl,
  //     this.config.dropdown.size,
  //     this.config.dropdown.width
  //   );
  //   this.renderer.listen(this.elRef.nativeElement, 'click', (e: any) => {
  //     this.domService.setPosition(
  //       e.target,
  //       this.compEl,
  //       this.config.dropdown.size,
  //       this.config.dropdown.width
  //     );
  //   });
  //   this.compIns.template = this.template;
  //   this.choosy.emit(this.prepareEvents(this.compIns.expose()));
  //   this.compIns.selections.subscribe((r: any) => {
  //     const val = this.config.displayValue ? r[this.config.displayValue] : r;
  //     this.setValue(val);
  //     this.onChange(r);
  //     this.compIns.close();
  //   });
  //   if (this.initialValue) {
  //     const val = this.config.displayValue
  //       ? this.initialValue[this.config.displayValue]
  //       : this.initialValue;
  //   }
  // }

  // ngOnDestroy(): void {
  //   this.builder.destroyComponent();
  // }

  // ngOnChanges(change: any): void {
  //   if (change.options && !change.options.firstChange) {
  //     this.options = change.options.currentValue;
  //     this.compIns.reloadOptions(this.options);
  //   }
  //   if (change.config) {
  //     this.config = this.compIns.config = this.globalConfig.getLocalConfig(
  //       change.config.currentValue
  //     ) as any;
  //   }
  //   // TODO merge original and dynamic config
  // }

  // @HostListener('document:click', ['$event'])
  // documentClickEvent(event: Event): void {
  //   this.closeOnOutsideClick(this.elRef.nativeElement, event);
  // }

  // @HostListener('click', ['$event'])
  // clickEvent(event: Event): void {
  //   this.closeOthersToggleThis();
  // }

  // @HostListener('window:resize', ['$event'])
  // windowResize(event: Event): void {
  //   const { size, width } = this.config.dropdown;
  //   this.domService.setPosition(
  //     this.elRef.nativeElement,
  //     this.compEl,
  //     this.config.dropdown.size,
  //     this.config.dropdown.width
  //   );
  // }

  // @HostListener('input', ['$event.target.value'])
  // onChange = (_: any): void => {};

  // @HostListener('blur', [])
  // onTouched = (_: any): void => {};

  // prepareEvents(componentEvent: any): void {
  //   return {
  //     ...componentEvent,
  //     clear: this.clear.bind(this)
  //   };
  // }
  // writeValue(value: any): void {
  //   if (!value) return;
  //   this.initialValue = value;
  //   const val = this.config.displayValue
  //     ? value[this.config.displayValue]
  //     : value;
  //   if (!value) {
  //     this.setValue(null);
  //     return;
  //   }
  //   this.setValue(val);
  //   this.onChange(val);
  // }
  // registerOnChange(fn: (_: any) => void): void {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: () => void): void {
  //   this.onTouched = fn;
  // }
  // isOpen(): boolean {
  //   return this.compIns.isOpened();
  // }
  // private setValue(value: any): void {
  //   this.renderer.setAttribute(this.elRef.nativeElement, 'value', value);
  // }

  // private clear(): void {
  //   this.setValue(null);
  //   this.onChange(null);
  //   this.compIns.clearSelectedOptions();
  // }
}
