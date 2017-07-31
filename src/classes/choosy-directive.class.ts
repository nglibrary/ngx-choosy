import {
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Renderer,
  ViewContainerRef
  } from '@angular/core';
import { ChoosyResultsComponent } from '../components';
import { ChoosyManagerService } from '../services';

export abstract class ChoosyDirective {

  protected compRef: ComponentRef<ChoosyResultsComponent>;
  protected renderer: Renderer;
  protected compFacResolver: ComponentFactoryResolver;
  protected viewContainerRef: ViewContainerRef;
  protected elRef: ElementRef;
  protected compIns: ChoosyResultsComponent;
  protected compEl: HTMLElement;
  protected insID: string;
  protected choosyManager: ChoosyManagerService;

  protected createChoosyInstance() {
    const factory = this.compFacResolver.resolveComponentFactory(ChoosyResultsComponent);
    this.compRef = this.viewContainerRef.createComponent(factory, 0);
    this.compIns = this.compRef.instance;
    this.compEl = this.compRef.instance.elRef.nativeElement;
    this.insID = Math.random().toString(36).substr(2, 5);
    this.choosyManager.addInstance(this.compIns, this.insID);
  };
  protected closeOnOutsideClick(el: HTMLElement, event: any) {
    if (
      event.target != el &&
      event.target != this.compEl &&
      !this.compEl.contains(event.target)
    ) {
      this.close();
    }
    event.preventDefault();
    event.stopPropagation();
    // TODO: refactor
  };
  protected closeOthersToggleThis() {
    this.choosyManager.instances.forEach((comp: any) => {
      if (comp.insID != this.insID) comp.ins.close();
      else comp.ins.toggle();
    });
  };

  protected applyDropdownSpan(mode = "AUTO", el = this.elRef.nativeElement, fixedWidth = 0) {
    const { offsetWidth, offsetHeight } = el;
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
      this.renderer.setElementStyle(el.parentNode, 'position', 'relative');
    }
    else if (mode == 'WRAP') { }
  };
  protected destroyComp() {
    this.compRef.destroy();
  }
  open(): void {
    this.compIns.open();
  }
  close(): void {
    this.compIns.close();
  }

  toggle(): void {
    this.compIns.toggle();
  }
}
