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
import { Subscription } from 'rxjs/Subscription';

export const DefaultOverlayInstanceConfig: OverlayInstanceConfig = {
  backdrop: false,
  containerClass: 'overlay-container',
  hostContainerClass: 'host-container',
  backdropClass: 'backdrop',
  watchWindowResize: false,
  watchDocClick: false,
  windowResizeCallback: () => {},
  docClickCallback: () => {},
  parentElement: null
};

@Injectable()
export class OverlayInstance {
  private config: OverlayInstanceConfig;
  private position: Position;
  private view: HTMLElement;
  computePos: Subject<boolean> = new Subject();
  hostContainer: HTMLElement;
  container: HTMLElement;
  backdrop: HTMLElement;
  id: string;
  positionSubscription: Subscription;
  events: BehaviorSubject<string> = new BehaviorSubject('init');
  constructor(public dom: DomHelper, public host: ComponentHost<any>, private messenger: Messenger) {}
  configure(position: Position = new DefaultPosition(), id?: string, config?: OverlayInstanceConfig) {
    this.config = { ...config, ...DefaultOverlayInstanceConfig };
    this.position = position;
    this.id = id;
  }
  create() {
    this.container = this.dom.createElement('div', {
      className: this.config.containerClass + ' ' + this.position.getClassName(),
      attr: {
        'data-overlay-id': this.id,
        style: 'left:0;position: fixed;top: 0;width: 100%;height: 100%;background: rgba(63, 81, 181, 0.39);'
      }
    });
    this.backdrop = this.dom.createElement('div', {
      className: this.config.backdropClass
    });
    this.hostContainer = this.dom.createElement('div', {
      className: this.config.hostContainerClass
    });
    if (this.config.backdrop) {
      this.dom.insertChildren(this.container, this.backdrop);
    }
    this.dom.insertChildren(this.config.parentElement || this.dom.html.BODY, this.container, this.hostContainer);
    this.events.next('attached');
    this.calculateCoords();
    return this;
  }
  destroy() {
    this.host.detach();
    this.dom.removeElement(this.container);
    this.events.next('detached');
    this.events.complete();
  }
  setView(view) {
    this.view = view;
    this.dom.insertChildren(this.hostContainer, view);
    this.computePos.next(true);
  }

  isHostContainerElement(element): boolean {
    return element !== this.hostContainer && element !== this.view && !this.view.contains(element);
  }

  cleanup() {
    this.positionSubscription.unsubscribe();
    this.container = this.hostContainer = this.backdrop = this.view = null;
  }

  private calculateCoords() {
    this.positionSubscription = this.computePos.subscribe(res => {
      const coords = this.position.getPositions(this.hostContainer);
      this.dom.setPositions(this.hostContainer, coords);
      this.events.next('positions updated');
    });
  }

  private watchSrcElementPos() {
    of((this.position as any).src).subscribe(e => {});
  }
}
