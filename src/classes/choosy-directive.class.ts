import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Renderer2
  } from '@angular/core';
import { ChoosyResultsComponent } from '../components';
import { ChoosyDomService, ChoosyManagerService } from '../services';

export abstract class ChoosyDirective {
  protected compIns: ChoosyResultsComponent;
  protected compEl: HTMLElement;
  protected insID: string;
  protected choosyManager: ChoosyManagerService;
  protected domService: ChoosyDomService;

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
  generateInsID(): string {
    return Math.random().toString(36).substr(2, 5);
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
