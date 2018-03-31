import { Injectable, Component } from '@angular/core';
import { Host } from './host';
import { OverlayInstanceConfig, ContainerSize } from './models';
import { DomHelper } from './helper/dom';
import { Position } from './position/position';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { DefaultPosition } from './position/default-position';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

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
  private size: ContainerSize = { width: 'auto', height: 'auto' };
  private computePos: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(public dom: DomHelper, public host: Host) {}
  create(id: string, config?: OverlayInstanceConfig) {
    this.config = { ...config, ...DefaultOverlayInstanceConfig };
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
  }
  attachComponent(component: Component, position: Position = new DefaultPosition(), size?: ContainerSize) {
    this.position = position;
    this.size = size;
    const host = this.host.attach(component);
    const compView = host.componentView();
    this.dom.insertChildren(this.hostContainer, compView);
    this.calculateCoords();
    // this.computePos.next(true);
    return host;
  }
  detachComponent() {}
  watchWindowResize() {
    fromEvent(window, 'resize').subscribe(() => this.computePos.next(true));
  }
  onClick() {}

  private calculateCoords() {
    this.computePos.subscribe(res => {
      const coords = this.position.getPositions(this.hostContainer, this.size);
      requestAnimationFrame(() => this.dom.setPositions(this.hostContainer, coords));
    });
  }
}
