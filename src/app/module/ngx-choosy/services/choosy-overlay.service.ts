import { Injectable, Component } from '@angular/core';
import { DomService } from './choosy-dom.service';
import { ChoosyHostService } from './choosy-host.service';

@Injectable()
export class OverlayService {
  protected overlayContainers: { [x: string]: HTMLElement } = {};
  private currentInstanceId;
  constructor(private dom: DomService, private host: ChoosyHostService) {}
  create() {
    let id;
    id = this.ID;
    this.overlayContainers[id] = this.dom.createElement('div', {
      className: 'overlay-container',
      attr: { 'data-overlay-id': id }
    });
    const hostContainer = this.dom.createElement('div', {
      className: 'host-container'
    });

    this.dom.insertChildren(this.dom.html.BODY, this.overlayContainers[id], hostContainer);
    return this.instantiate(id);
  }
  destroy() {
    this.dom.removeElement(this.overlayContainers[this.currentInstanceId]);
  }

  attachComponent(component: Component) {
    const host = this.host.attach(component);
    const compView = host.componentView();
    this.dom.insertChildren(this.getHostElement(), compView);
    return host;
  }

  private instantiate(id) {
    const newObj: OverlayService | any = new OverlayService(this.dom, this.host);
    Object.defineProperties(newObj, Object.getOwnPropertyDescriptors(this));
    newObj.currentInstanceId = id;
    return newObj;
  }

  private getHostElement(): HTMLElement {
    return this.overlayContainers[this.currentInstanceId].querySelector('div');
  }

  private get ID() {
    return Math.random()
      .toString(36)
      .substr(2, 5);
  }
}
