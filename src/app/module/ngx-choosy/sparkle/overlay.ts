import { Injectable, Component } from '@angular/core';
import { DomHelper } from './helper/dom';
import { Host } from './host';
import { ContainerSize } from './models';
import { Position } from './position/position';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Injectable()
export class Overlay {
  protected instances: { [x: string]: HTMLElement } = {};
  private currentInstanceId;
  private position: Position;
  private size: ContainerSize;
  constructor(private dom: DomHelper, private host: Host) {}
  create(position: Position, size: ContainerSize = { width: '100%', height: 'auto' }) {
    this.position = position;
    this.size = size;
    const id = this.ID;
    this.instances[id] = this.dom.createElement('div', {
      className: 'overlay-container',
      attr: { 'data-overlay-id': id }
    });
    const hostContainer = this.dom.createElement('div', {
      className: 'host-container'
    });

    this.dom.insertChildren(this.dom.html.BODY, this.instances[id], hostContainer);

    return this.instantiate(id);
  }
  destroy(): void {
    this.dom.removeElement(this.instances[this.currentInstanceId]);
  }

  attachComponent(component: Component): Host {
    const host = this.host.attach(component);
    const compView = host.componentView();
    const hostElement = this.getHostElement();
    this.dom.insertChildren(hostElement, compView);
    const coords = this.position.getPositions(compView, this.size);
    this.dom.setPositions(hostElement, coords);

    this.watchWindowResize();
    return host;
  }

  private instantiate(id): Overlay {
    const newObj: Overlay | any = new Overlay(this.dom, this.host);
    // Object.defineProperties(newObj, Object.getOwnPropertyDescriptors(this));
    newObj.position = this.position;
    newObj.size = this.size;
    newObj.instances = this.instances;
    newObj.currentInstanceId = id;
    return newObj;
  }

  private watchWindowResize() {
    fromEvent(window, 'resize')
      // .pipe(throttleTime(1500))
      .subscribe(event => {
        console.log('window resize');
        const k = Object.keys(this.instances)[0];
        const overl = this.instances[k];
        const hostc = overl.querySelector('.host-container');
        const compc = hostc.children[0];
        console.log('--', overl, hostc, compc);
        const coords = this.position.getPositions(compc, this.size);
        this.dom.setPositions(hostc, coords);
      });
  }

  private getHostElement(): HTMLElement {
    return this.instances[this.currentInstanceId].querySelector('div');
  }

  private get ID(): string {
    return Math.random()
      .toString(36)
      .substr(2, 5);
  }
}
