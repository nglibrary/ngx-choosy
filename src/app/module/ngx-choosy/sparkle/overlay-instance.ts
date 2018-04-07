import { Injectable, Component, ComponentDecorator } from '@angular/core';
import { OverlayInstanceConfig, ContainerSize, ComponentType } from './models';
import { DomHelper } from './helper/dom';
import { Position } from './position/position';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { DefaultPosition } from './position/default-position';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Messenger } from './helper/messenger';
import { ComponentHost } from './host';

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

@Injectable()
export class OverlayInstance {
  private config: OverlayInstanceConfig;
  private container: HTMLElement;
  private hostContainer: HTMLElement;
  private position: Position;
  private view: HTMLElement;
  private computePos: BehaviorSubject<boolean> = new BehaviorSubject(true);
  id: string;
  events: BehaviorSubject<string> = new BehaviorSubject('init');
  constructor(public dom: DomHelper, public host: ComponentHost<any>, private messenger: Messenger) {}
  configure(position: Position = new DefaultPosition(), id?: string, config?: OverlayInstanceConfig) {
    this.config = { ...config, ...DefaultOverlayInstanceConfig };
    this.position = position;
    this.id = id;
  }
  create() {
    this.container = this.dom.createElement('div', {
      className: this.config.containerClass,
      attr: {
        'data-overlay-id': this.id,
        style: 'left:0;position: fixed;top: 0;width: 100%;height: 100%;background: rgba(63, 81, 181, 0.39);'
      }
    });
    this.hostContainer = this.dom.createElement('div', {
      className: this.config.hostContainerClass
    });
    this.dom.insertChildren(this.config.parentElement || this.dom.html.BODY, this.container, this.hostContainer);
    this.events.next('attached');
    this.watchWindowResize();
    return this;
  }
  destroy() {
    this.host.detach();
    this.dom.removeElement(this.container);
    this.events.next('detached');
    this.messenger.post({ name: 'REMOVE_OVERLAY_INS', data: this.id });
  }
  setView(view) {
    this.view = view;
    this.dom.insertChildren(this.hostContainer, view);
    this.calculateCoords();
    this.computePos.next(true);
    this.outsideClick();
  }
  watchWindowResize() {
    fromEvent(window, 'resize').subscribe(() => this.computePos.next(true));
  }
  outsideClick() {
    return fromEvent(this.container, 'click').subscribe((event: any) => {
      if (event.target !== this.hostContainer && event.target !== this.view && !this.view.contains(event.target)) {
        this.events.next('outside clicked');
        this.destroy();
      }
    });
  }

  private calculateCoords() {
    this.computePos.subscribe(res => {
      const coords = this.position.getPositions(this.hostContainer);
      this.dom.setPositions(this.hostContainer, coords);
      this.events.next('positions updated');
    });
  }

  private watchSrcElementPos() {
    of((this.position as any).src).subscribe(e => {
      console.log('element', e);
    });
  }
}
