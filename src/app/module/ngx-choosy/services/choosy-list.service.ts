import { Injectable } from '@angular/core';
import { ChoosyOption } from '../models';

@Injectable()
export class ChoosyListService {
  constructor() {}

  addMetaData(option): ChoosyOption {
    return {
      uid: this.generateUID(),
      state: {
        disabled: false,
        selected: false,
        hidden: false
      },
      value:
        !option ||
        (typeof option === 'object' && Object.keys(option).length === 0)
          ? '-'
          : option
    };
  }

  private generateUID(length = 36): string {
    return Math.random()
      .toString(length)
      .substr(2, 6);
  }
}
