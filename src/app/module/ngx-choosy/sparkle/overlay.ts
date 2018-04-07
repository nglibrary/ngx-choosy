import { Injectable, Component } from '@angular/core';
import { DomHelper } from './helper/dom';
import { ContainerSize } from './models';
import { Position } from './position/position';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { OverlayInstance } from './overlay-instance';
import { DefaultPosition } from './position/default-position';
import { Messenger } from './helper/messenger';
import { ComponentHost } from './host';

export const Config = {
  maxOverlays: 3,
  closeWhenOtherOpen: false
};

@Injectable()
export class Overlay {
  protected instances: { [x: string]: OverlayInstance } = {};
  constructor(private dom: DomHelper, private host: ComponentHost<any>, private messenger: Messenger) {
    this.messenger
      .watch()
      .filter(e => e.name === 'REMOVE_OVERLAY_INS')
      .subscribe(e => {
        delete this.instances[e.data];
        console.log('removed: ', this.instances);
      });
  }
  create(position: Position = new DefaultPosition(), id: string = this.ID) {
    const overlayIns = new OverlayInstance(this.dom, this.host, this.messenger);
    this.instances[id] = overlayIns.create(position, id);
    return this.instances[id];
  }
  private get ID(): string {
    return Math.random()
      .toString(36)
      .substr(2, 5);
  }
}
