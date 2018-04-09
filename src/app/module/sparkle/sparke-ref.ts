import { Injectable } from '@angular/core';
import { ComponentHost } from './host';
import { OverlayInstance } from './overlay-ins';
import { Messenger } from './helper/messenger';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { map, filter, tap, observeOn, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ComponentInstance } from './component-ins';
import { animationFrame } from 'rxjs/scheduler/animationFrame';

@Injectable()
export class SparkleRef<C> {
  compIns: ComponentInstance<C>;
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
    this.addEvent('overlay', this._overlay);
  }
  open() {
    const view = this._host.attach().componentView();
    this._overlay.create().setView(view);
    this.compIns = this._host.getCompIns();
    const comp = this.compIns.component as any;
    this.addEvent(comp.name, comp);
    this.onDocumentClick();
    this.onWindowResize();
    setTimeout(_ => this._overlay.computePos.next(true), 0);
    return this;
  }
  close() {
    this._overlay.destroy();
    this._messenger.post({ name: 'REMOVE_OVERLAY_INS', data: this.id });
    this.cleanup();
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
    this.windowResizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(10), observeOn(animationFrame), distinctUntilChanged())
      .subscribe(() => {
        this._overlay.computePos.next(true);
      });
  }

  private addEvent(name, type) {
    this.events[name] = type.events.asObservable();
  }

  private cleanup() {
    this.docClickSubscription.unsubscribe();
    this.windowResizeSubscription.unsubscribe();
  }
}
