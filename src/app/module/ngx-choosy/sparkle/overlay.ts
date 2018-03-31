import { Injectable, Component } from '@angular/core';
import { DomHelper } from './helper/dom';
import { Host } from './host';
import { ContainerSize } from './models';
import { Position } from './position/position';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { OverlayInstance } from './overlay-instance';

export const Config = {
  maxOverlays: 3,
  closeWhenOtherOpen: false
};

@Injectable()
export class Overlay {
  protected instances: { [x: string]: OverlayInstance } = {};
  constructor(private dom: DomHelper, private host: Host) {}
  create() {
    const id = this.ID;
    const overlayIns = new OverlayInstance(this.dom, this.host);
    this.instances[id] = overlayIns.create(id);
    return this.instances[id];
  }
  private get ID(): string {
    return Math.random()
      .toString(36)
      .substr(2, 5);
  }
}
