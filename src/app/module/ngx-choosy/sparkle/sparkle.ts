import { Injectable } from '@angular/core';
import { Position } from './position/position';
import { OverlayInstance } from './overlay-instance';
import { ComponentHost } from './host';
import { DomHelper } from './helper/dom';
import { SparkleRef } from './sparke-ref';
import { ComponentType } from './models';

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
  constructor(private _overlay: OverlayInstance, private _host: ComponentHost<C>) {}
  overlay(position: Position, id): Sparkle<C> {
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
    const view = this._host.attach(this._component, this._props).componentView();
    this._overlay.create(this._position, this._id).setView(view);
    return new SparkleRef(this._overlay, this._host);
  }
}
