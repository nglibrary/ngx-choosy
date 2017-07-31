import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer,
  TemplateRef,
  ViewContainerRef
  } from '@angular/core';
import * as merge from 'deepmerge';
import { ChoosyDirective } from '../../classes';
import { ChoosyManagerService } from '../../services';
import { ChoosyResultsComponent } from './../../components';
import { ChoosyButtonSelectConfig } from './../../interfaces';

@Directive({ selector: '[choosyButtonSelect]' })
export class ChoosyButtonSelectDirective extends ChoosyDirective implements
  OnInit, AfterViewInit, OnDestroy {

  @Input() options: Array<any> = [];
  @Input() config: ChoosyButtonSelectConfig = {} as any;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() selectedItemTemplate: TemplateRef<any>;

  localConfig: any = {
    search: {
      enable: false
    },
    footer: {
      enable: false
    },
    dropdown: {
      width: 300,
      height: 'none',
      animation: true
    }
  }

  constructor(
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
    this.compIns.config = this.config = merge(this.localConfig, this.config);
    this.compIns.options = this.options;
  }

  ngAfterViewInit() {
    this.renderer.listen(this.elRef.nativeElement, 'focus', (e: any) => {
      this.applyDropdownSpan(
        this.config.dropdown.size,
        e.target,
        this.config.dropdown.width
      );
    });

    this.compIns.template = this.itemTemplate;
    this.compIns.selections.subscribe((r: any) => {
      const view = this.viewContainerRef.createEmbeddedView(this.selectedItemTemplate, {
        $implicit: r
      }, 0);
      this.renderer.setElementProperty(this.elRef.nativeElement, 'innerHTML', '');
      this.renderer.invokeElementMethod(this.elRef.nativeElement, 'appendChild', [view.rootNodes[0].nextSibling]);
      this.compIns.close();
    });
  }

  ngOnDestroy(): void {
    this.destroyComp();
  }

  @HostListener('click', [])
  clickEvent(): void {
    this.closeOthersToggleThis();
  }
  @HostListener('document:click', ['$event'])
  documentClickEvent(event: Event): void {
    this.closeOnOutsideClick(this.elRef.nativeElement, event);
  }
}
