import { Injectable } from '@angular/core';
import { HtmlElementOptions } from '../models';

export type Elem = Document | HTMLElement;

@Injectable()
export class DomService {
  html = {
    BODY: document.getElementsByTagName('body')[0]
  };
  constructor() {}
  createElement(elementName: string, { className = '', id = '', attr = {} }: HtmlElementOptions): HTMLElement {
    const element = document.createElement(elementName);
    element.className = className;
    element.id = id;
    Object.keys(attr).forEach(name => element.setAttribute(name, attr[name]));

    return element;
  }

  insertChildren(parentElement: HTMLElement, ...childElements: HTMLElement[]): HTMLElement {
    let prevParent = parentElement;
    childElements.forEach(elem => {
      prevParent = prevParent.appendChild(elem);
    });
    return prevParent;
  }

  setPositions(element: HTMLElement, positions: object) {
    Object.keys(positions).forEach(prop => {
      element.style[prop] = `${positions[prop]}px`;
    });
  }

  removeElement(element: HTMLElement) {
    element.parentNode.removeChild(element);
  }
}
