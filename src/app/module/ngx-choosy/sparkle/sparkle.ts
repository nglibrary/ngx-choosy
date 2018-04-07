import { Injectable } from '@angular/core';
import { Position } from './position/position';
import { OverlayInstance } from './overlay-instance';
import { ComponentHost } from './host';
import { DomHelper } from './helper/dom';
import { SparkleRef } from './sparke-ref';
import { ComponentType } from './models';
import { Utils } from './helper/utils';
import { Messenger } from './helper/messenger';
import { filter } from 'rxjs/operators';

export class SparkleFriendly {
  constructor() {}
  events;
  config;
}

@Injectable()
export class Sparkle<C> {
  private _position: Position;
  private _id: string;
  private _component: ComponentType<C>;
  private _props: { [x: string]: any };
  private _sparkleRefs = [];
  constructor(
    private _overlay: OverlayInstance,
    private _host: ComponentHost<C>,
    private _messenger: Messenger,
    private utils: Utils
  ) {
    this._messenger
      .watch()
      .pipe(filter(e => e.name === 'REMOVE_OVERLAY_INS'))
      .subscribe(e => {
        delete this._sparkleRefs[e.data];
        console.log('removed: ', this._sparkleRefs);
      });
  }
  overlay(position: Position, id = this.utils.ID): Sparkle<C> {
    this._position = position;
    this._id = id;
    return this;
  }
  host(component: ComponentType<C>, props: { [x: string]: any } = {}): Sparkle<C> {
    // if (!(component instanceof SparkleFriendly)) {
    //   throw new Error('Component must implement SparkleFriendly Class!');
    // }
    this._component = component;
    this._props = props;
    return this;
  }
  create(): SparkleRef<C> {
    if (this._sparkleRefs[this._id]) {
      return;
    }
    const view = this._host.attach(this._component, this._props).componentView();
    this._overlay.create(this._position, this._id).setView(view);
    this._sparkleRefs[this._id] = new SparkleRef(this._overlay, this._host, this._messenger, this._id);
    return this._sparkleRefs[this._id];
  }
}
