import { Injectable } from '@angular/core';
import { ComponentHost } from './host';
import { OverlayInstance } from './overlay-ins';
import { Messenger } from './helper/messenger';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { map, filter, tap, observeOn, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ComponentInstance } from './component-ins';
import { animationFrame } from 'rxjs/scheduler/animationFrame';

@Injectable()
export class SparkleRef<C> {
  compIns: ComponentInstance<C>;
  events = {};
  config;
  count = 0;
  static c = 0;
  private alive: Subject<any> = new Subject();
  constructor(
    private _overlay: OverlayInstance,
    private _host: ComponentHost<C>,
    private _messenger: Messenger,
    public id: string
  ) {
    this.addEvent('overlay', this._overlay);
    this.count++;
    console.log('sparkle ref initiated', this.count);
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
    SparkleRef.c++;
    console.log(`SparkleRef called: ${SparkleRef.c} times`);
  }
  onDocumentClick() {
    fromEvent(this._overlay.container, 'click')
      .pipe(
        takeUntil(this.alive),
        map((e: any) => e.target),
        filter(this._overlay.isHostContainerElement.bind(this._overlay))
      )
      .subscribe((elem: any) => {
        this.close();
      });
  }
  onWindowResize() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.alive), debounceTime(10), observeOn(animationFrame), distinctUntilChanged())
      .subscribe(() => {
        this._overlay.computePos.next(true);
      });
  }

  private addEvent(name, type) {
    this.events[name] = type.events.asObservable().pipe(takeUntil(this.alive));
  }

  private cleanup() {
    this.alive.next(true);
  }
}
