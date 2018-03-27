import { Injectable } from '@angular/core';
import { DomService } from './choosy-dom.service';

@Injectable()
export class OverlayService {
  protected overlayContainers: { [x: string]: HTMLElement } = {};
  private currentInstanceId;
  constructor(private dom: DomService) {}
  create() {
    let id;
    id = this.ID;
    this.overlayContainers[id] = this.dom.createElement('div', {
      className: 'overlay-container',
      attr: { 'overlay-id': id }
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

  private instantiate(id) {
    const newObj: OverlayService | any = new OverlayService(this.dom);
    Object.defineProperties(newObj, Object.getOwnPropertyDescriptors(this));
    newObj.currentInstanceId = id;
    return newObj;
  }

  private get ID() {
    return Math.random()
      .toString(36)
      .substr(2, 5);
  }
}
