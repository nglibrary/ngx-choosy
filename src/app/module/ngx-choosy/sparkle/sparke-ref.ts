import { Injectable } from '@angular/core';
import { ComponentHost } from './host';
import { OverlayInstance } from './overlay-instance';
import { Messenger } from './helper/messenger';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { map, filter, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SparkleRef<C> {
  componentInstance: C;
  events = {};
  config;
  private docClickSubscription: Subscription;
  private windowResizeSubscription: Subscription;
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
    this.onDocumentClick();
    this.onWindowResize();
    setTimeout(_ => this._overlay.computePos.next(true), 0);
    return this;
  }
  close() {
    this._overlay.destroy();
    this._messenger.post({ name: 'REMOVE_OVERLAY_INS', data: this.id });
    this.docClickSubscription.unsubscribe();
    this.windowResizeSubscription.unsubscribe();
    this._overlay.cleanup();
  }
  onDocumentClick() {
    this.docClickSubscription = fromEvent(this._overlay.container, 'click')
      .pipe(map((e: any) => e.target), filter(this._overlay.isHostContainerElement.bind(this._overlay)))
      .subscribe((elem: any) => {
        this.close();
      });
  }
  onWindowResize() {
    this.windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this._overlay.computePos.next(true);
    });
  }
}
