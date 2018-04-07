import { Injectable } from '@angular/core';
import { ComponentHost } from './host';
import { OverlayInstance } from './overlay-instance';

@Injectable()
export class SparkleRef<C> {
  componentInstance: C;
  events;
  config;
  constructor(private _overlay: OverlayInstance, private _host: ComponentHost<C>) {}
  close() {}
}
