import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  constructor() {}

  search(list, keyword, config) {
    return this.initializeSearch().then((fuse: any) => {
      const f = new fuse(list, config);
      return f.search(keyword);
    });
  }

  private initializeSearch() {
    return new Promise((res, rej) => {
      const fuse = import(/* webpackChunkName: "fusejs" */ 'fuse.js');
      res(fuse);
      if (!fuse) {
        rej('error occured');
      }
    });
  }
}
