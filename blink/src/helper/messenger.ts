import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MessengerEvent } from '../models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Messenger {
  private messageSub: Subject<any> = new Subject();
  constructor() {}
  post(event: MessengerEvent) {
    this.messageSub.next(event);
  }
  watch():Observable<any> {
    return this.messageSub.asObservable();
  }
}
