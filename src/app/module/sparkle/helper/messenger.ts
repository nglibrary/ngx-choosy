import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MessengerEvent } from '../models';

@Injectable()
export class Messenger {
  private messageSub: Subject<any> = new Subject();
  constructor() {}
  post(event: MessengerEvent) {
    this.messageSub.next(event);
  }
  watch() {
    return this.messageSub.asObservable();
  }
}
