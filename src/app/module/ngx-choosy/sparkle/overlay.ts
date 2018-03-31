import { Injectable, Component } from '@angular/core';
import { DomHelper } from './helper/dom';
import { Host } from './host';
import { ContainerSize } from './models';
import { Position } from './position/position';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, throttleTime, distinctUntilChanged } from 'rxjs/operators';

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
    const foo = this.instantiate(id);
    foo.watchWindowResize();
    return foo;
  }
  destroy(): void {
    this.dom.removeElement(this.instances[this.currentInstanceId]);
  }

  attachComponent(component: Component): Host {
    const host = this.host.attach(component);
    const compView = host.componentView();
    const hostElement = this.getHostElement();
    this.dom.insertChildren(hostElement, compView);
    const coords = this.position.getPositions(hostElement, this.size);
    console.log('initial coordinates', coords);
    this.dom.setPositions(hostElement, coords);
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
      // .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(event => {
        console.log('window resize');
        const h = this.getHostElement();
        const coords = this.position.getPositions(h, this.size);
        this.dom.setPositions(h, coords);
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
