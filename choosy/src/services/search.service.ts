import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  search(options: any[], keyword: string, config) {
    return this._initializeSearch().then((fuse: any) => new fuse(options, config).search(keyword));
  }
  private _initializeSearch() {
    return new Promise((res, rej) => {
      const fuse = import(/* webpackChunkName: "fusejs" */ 'fuse.js');
      res(fuse);
      if (!fuse) rej('error occured');
    });
  }
}
