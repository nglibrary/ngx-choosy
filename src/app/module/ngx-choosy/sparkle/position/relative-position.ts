import { OutsidePlacement, PositionCoOrds, ContainerSize } from '../models';
import { Position } from './position';

export interface Config {
  src?: HTMLElement;
  pos?: OutsidePlacement;
  autoUpdate?: boolean;
}

export class RelativePosition extends Position {
  private src: HTMLElement;
  private pos: OutsidePlacement;
  private autoUpdate: boolean;
  constructor({ src, pos = OutsidePlacement.TOP, autoUpdate = false }: Config = {}) {
    super();
    this.src = src;
    this.pos = pos;
    this.autoUpdate = autoUpdate;
  }
  getPositions(hostElement: HTMLElement, size: ContainerSize): PositionCoOrds {
    const srcCoords = this.getCoords(this.src);
    const hostCoords = this.getCoords(hostElement);

    const top = srcCoords.top;
    const left = srcCoords.left;

    if (size.width === '100%') {
      size.width = srcCoords.width + 'px';
    }

    switch (this.pos) {
      case OutsidePlacement.BOTTOM:
        return { ...size, top: srcCoords.bottom, left: left };
      case OutsidePlacement.TOP:
        return { ...size, top: top - hostCoords.height, left };
      case OutsidePlacement.LEFT:
        return { ...size, top, left: left - hostCoords.width };
      case OutsidePlacement.RIGHT:
        return { ...size, top, left: srcCoords.right };
    }
  }

  private getSize(el): { x: number; y: number } {
    const { offsetWidth, offsetHeight } = el;
    const [x, y] = [offsetWidth, offsetHeight];
    return { x, y };
  }

  private getCoords(elem: HTMLElement): PositionCoOrds {
    const box: any = elem.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return {
      top: Math.round(top),
      left: Math.round(left),
      height: box.height,
      right: box.right,
      bottom: box.bottom,
      width: box.width
    };
  }
}
