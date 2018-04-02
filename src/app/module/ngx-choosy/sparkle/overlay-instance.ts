import { Injectable, Component, ComponentDecorator } from '@angular/core';
import { Host } from './host';
import { OverlayInstanceConfig, ContainerSize, ComponentType } from './models';
import { DomHelper } from './helper/dom';
import { Position } from './position/position';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { DefaultPosition } from './position/default-position';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

export const DefaultOverlayInstanceConfig: OverlayInstanceConfig = {
  backdrop: false,
  containerClass: 'overlay-container',
  hostContainerClass: 'host-container',
  watchWindowResize: false,
  watchDocClick: false,
  windowResizeCallback: () => {},
  docClickCallback: () => {},
  parentElement: null
};

export class OverlayInstance {
  private config: OverlayInstanceConfig;
  private container: HTMLElement;
  private hostContainer: HTMLElement;
  private position: Position;
  private computePos: BehaviorSubject<boolean> = new BehaviorSubject(true);
  id: string;
  constructor(public dom: DomHelper, public host: Host<any>) {}
  create(position: Position = new DefaultPosition(), id?: string, config?: OverlayInstanceConfig) {
    this.config = { ...config, ...DefaultOverlayInstanceConfig };
    this.position = position;
    this.id = id;
    this.container = this.dom.createElement('div', {
      className: this.config.containerClass,
      attr: { 'data-overlay-id': id }
    });
    this.hostContainer = this.dom.createElement('div', {
      className: this.config.hostContainerClass
    });
    this.dom.insertChildren(this.config.parentElement || this.dom.html.BODY, this.container, this.hostContainer);
    this.watchWindowResize();
    return this;
  }
  destroy() {
    this.dom.removeElement(this.container);
    this.host.detach();
  }
  attachComponent<T>(component: ComponentType<T>, props = {}) {
    const host: Host<T> = this.host.attach(component, props);
    const compView = host.componentView();
    this.dom.insertChildren(this.hostContainer, compView);
    this.calculateCoords();
    this.computePos.next(true);
    this.watchSrcElementPos();
    this.watchSrcElement();
    return host;
  }
  detachComponent() {}
  watchWindowResize() {
    fromEvent(window, 'resize').subscribe(() => this.computePos.next(true));
  }
  onClick() {}

  private calculateCoords() {
    this.computePos.subscribe(res => {
      const coords = this.position.getPositions(this.hostContainer);
      this.dom.setPositions(this.hostContainer, coords);
    });
  }

  private watchSrcElementPos() {
    of((this.position as any).src).subscribe(e => {
      console.log('element', e);
    });
  }

  private watchSrcElement() {
    // const observer = new MutationObserver(
    //   function(mutations) {
    //     // console.log('size changed!', mutations);s
    //   }.bind(this)
    // );
    // observer.observe((this.position as any).src, {
    //   attributes: true,
    //   childList: true,
    //   characterData: true,
    //   subtree: true
    // });
  }
}
