import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
  constructor() {}
  get ID(): string {
    return Math.random()
      .toString(36)
      .substr(2, 5);
  }
}
