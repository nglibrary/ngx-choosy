import { Injectable, Renderer2 } from '@angular/core';
@Injectable()
export class ChoosyDomService {
  renderer: Renderer2;
  getElementOffset(element: HTMLElement): { [x: string]: any } {
    const coOrd = element.getBoundingClientRect();
    const top = (window.scrollY + coOrd.top) + coOrd.height;
    const left = window.scrollX + coOrd.left;
    return {
      height: Math.ceil(coOrd.height),
      width: Math.ceil(coOrd.width),
      bottom: Math.ceil(coOrd.bottom),
      right: Math.ceil(coOrd.right),
      top: Math.ceil(top),
      left: Math.ceil(left)
    };
  }
  applyStyle(element: HTMLElement, styleObj: { [x: string]: any } = {}): void {
    for (let style in styleObj) {
      this.renderer.setStyle(element, style, styleObj[style] + 'px');
    }
  }
  setPosition(srcEl, desEl, mode, fixedWidth) {
    let top, width, left;
    const elCoOrds = this.getElementOffset(srcEl);
    const parentElCoOrds = this.getElementOffset(srcEl.parentNode);
    if (mode == 'AUTO') {
      ({ top, left, width } = elCoOrds);
    }
    else if (mode == 'FIXED') {
      ({ top, left } = elCoOrds);
      width = fixedWidth;
    }
    else if (mode == 'PARENT') {
      ({ top, left, width } = parentElCoOrds);
    }
    this.applyStyle(desEl, { top, width, left });
  }
}
