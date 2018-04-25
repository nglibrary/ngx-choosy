import { Component, HostBinding } from '@angular/core';

export abstract class BaseView {
  @HostBinding('attr.class') className: string;
  abstract name: string;
  init() {
    this.className = `choosy-view ${this.name.toLocaleLowerCase()}`;
  }
}
