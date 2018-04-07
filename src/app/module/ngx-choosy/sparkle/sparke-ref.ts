import { Injectable } from '@angular/core';
import { ComponentHost } from './host';
import { OverlayInstance } from './overlay-instance';
import { Messenger } from './helper/messenger';

@Injectable()
export class SparkleRef<C> {
  componentInstance: C;
  events = {};
  config;
  constructor(
    private _overlay: OverlayInstance,
    private _host: ComponentHost<C>,
    private _messenger: Messenger,
    public id: string
  ) {
    this.events['overlay'] = this._overlay.events.asObservable();
  }
  open() {
    const view = this._host.attach().componentView();
    this._overlay.create().setView(view);
    return this;
  }
  close() {
    this._messenger.post({ name: 'REMOVE_OVERLAY_INS', data: this.id });
  }
}
