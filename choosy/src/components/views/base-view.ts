import { Component, HostBinding } from '@angular/core';

export abstract class BaseView {
  @HostBinding('attr.class') className: string;
  init() {
    this.className = `choosy-view choosy-view-${this.constructor.name.toLocaleLowerCase()}`;
  }
}
