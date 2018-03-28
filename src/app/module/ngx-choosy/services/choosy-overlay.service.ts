import { Injectable, Component } from '@angular/core';
import { DomService } from './choosy-dom.service';
import { ChoosyHostService } from './choosy-host.service';

@Injectable()
export class OverlayService {
  protected overlayContainers: { [x: string]: HTMLElement } = {};
  private currentInstanceId;
  private position;
  constructor(private dom: DomService, private host: ChoosyHostService) {}
  create(position) {
    const id = this.ID;
    this.overlayContainers[id] = this.dom.createElement('div', {
      className: 'overlay-container',
      attr: { 'data-overlay-id': id }
    });
    const hostContainer = this.dom.createElement('div', {
      className: 'host-container'
    });

    this.dom.insertChildren(this.dom.html.BODY, this.overlayContainers[id], hostContainer);
    this.position = position.getPositions();
    return this.instantiate(id);
  }
  destroy(): void {
    this.dom.removeElement(this.overlayContainers[this.currentInstanceId]);
  }

  attachComponent(component: Component): ChoosyHostService {
    const host = this.host.attach(component);
    const compView = host.componentView();
    this.dom.setPositions(this.getHostElement(), this.position);
    this.dom.insertChildren(this.getHostElement(), compView);

    console.log('this.position', this.position);
    return host;
  }

  private instantiate(id): OverlayService {
    const newObj: OverlayService | any = new OverlayService(this.dom, this.host);
    console.log('few', newObj);
    // Object.defineProperties(newObj, Object.getOwnPropertyDescriptors(this));
    newObj.position = this.position;
    newObj.overlayContainers = this.overlayContainers;
    newObj.currentInstanceId = id;
    return newObj;
  }

  private getHostElement(): HTMLElement {
    return this.overlayContainers[this.currentInstanceId].querySelector('div');
  }

  private get ID(): string {
    return Math.random()
      .toString(36)
      .substr(2, 5);
  }
}
