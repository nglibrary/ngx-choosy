import {
  AfterViewInit,
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import * as merge from 'deepmerge';
import { ChoosyDirective } from '../../classes';
import { ChoosyDomService, ChoosyManagerService } from '../../services';
import { ChoosyComponentBuilderService } from '../../services/choosy-component-builder/choosy-component-builder.service';
import { ChoosyResultsComponent } from './../../components';
import { ChoosyButtonSelectConfig } from './../../interfaces';

@Directive({ selector: '[choosyButtonSelect]' })
export class ChoosyButtonSelectDirective extends ChoosyDirective
  implements OnInit, AfterViewInit, OnDestroy {
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
  };

  constructor(
    public elRef: ElementRef,
    public renderer: Renderer2,
    public choosyManager: ChoosyManagerService,
    public vcRef: ViewContainerRef,
    public domService: ChoosyDomService,
    public builder: ChoosyComponentBuilderService
  ) {
    super();
    builder.vcRef = this.vcRef;
    this.builder.initiateComponent('');
    domService.renderer = this.renderer;
  }

  ngOnInit(): void {
    this.config = merge.default(this.localConfig, this.config);
    this.builder.setComponentInputs({
      config: this.config,
      options: this.options
    });
    this.builder.attachComponent();
    this.compIns = this.builder.getComponentIns();
  }

  ngAfterViewInit() {
    this.renderer.listen(this.elRef.nativeElement, 'click', (e: any) => {
      this.domService.setPosition(
        e.target,
        this.compEl,
        this.config.dropdown.size,
        this.config.dropdown.width
      );
    });
    this.compIns.template = this.itemTemplate;
    this.compIns.selections.subscribe((r: any) => {
      const view = this.vcRef.createEmbeddedView(
        this.selectedItemTemplate,
        {
          $implicit: r
        },
        0
      );
      this.renderer.setProperty(this.elRef.nativeElement, 'innerHTML', '');
      const node =
        view.rootNodes.length == 1
          ? view.rootNodes[0]
          : view.rootNodes[0].nextSibling;
      this.elRef.nativeElement.appendChild(node);

      this.compIns.close();
    });
  }

  ngOnDestroy(): void {
    this.builder.destroyComponent();
  }

  @HostListener('click', [])
  clickEvent(): void {
    this.closeOthersToggleThis();
  }
  @HostListener('document:click', ['$event'])
  documentClickEvent(event: Event): void {
    this.closeOnOutsideClick(this.elRef.nativeElement, event);
  }
  @HostListener('window:resize', ['$event'])
  windowScroll(event: Event): void {
    console.log('window:resize');
    this.domService.setPosition(
      this.elRef.nativeElement,
      this.compEl,
      this.config.dropdown.size,
      this.config.dropdown.width
    );
  }
}
