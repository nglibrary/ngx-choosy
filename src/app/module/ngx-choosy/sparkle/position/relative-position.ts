import { OutsidePlacement, PositionCoOrds, ContainerSize } from '../models';
import { Position } from './position';

export interface Config {
  src?: HTMLElement;
  pos?: OutsidePlacement;
  autoUpdate?: boolean;
  hostWidth?: string | number;
  hostHeight?: string | number;
}

export class RelativePosition extends Position {
  src: HTMLElement;
  private pos: OutsidePlacement;
  private autoUpdate: boolean;
  private hostWidth: string | number;
  private hostHeight: string | number;
  constructor({
    src,
    pos = OutsidePlacement.TOP,
    autoUpdate = false,
    hostWidth = '100%',
    hostHeight = '100%'
  }: Config) {
    super();
    this.src = src;
    this.pos = pos;
    this.hostWidth = hostWidth;
    this.hostHeight = hostHeight;
    this.autoUpdate = autoUpdate;
  }
  getPositions(hostElement: HTMLElement): PositionCoOrds {
    const s = this.getCoords(this.src);

    if (this.hostWidth === '100%') {
      this.hostWidth = s.width;
    }

    if (this.hostHeight === '100%') {
      this.hostHeight = 'auto';
    }
    const h = this.getCoords(hostElement);
    let props;
    switch (this.pos) {
      case OutsidePlacement.BOTTOM:
        props = this.calculateBottom(s, h);
        break;
      case OutsidePlacement.TOP:
        props = this.calculateTop(s, h);
        break;
      case OutsidePlacement.LEFT:
        props = this.calculateLeft(s, h);
        break;
      case OutsidePlacement.RIGHT:
        props = this.calculateRight(s, h);
        break;
      case OutsidePlacement.TOP_LEFT:
        props = this.calculateTopLeft(s, h);
        break;
      case OutsidePlacement.TOP_RIGHT:
        props = this.calculateTopRight(s, h);
        break;
      case OutsidePlacement.BOTTOM_LEFT:
        props = this.calculateBottomLeft(s, h);
        break;
      case OutsidePlacement.BOTTOM_RIGHT:
        props = this.calculateBottomRight(s, h);
        break;
      case OutsidePlacement.RIGHT_TOP:
        props = this.calculateRightTop(s, h);
        break;
      case OutsidePlacement.RIGHT_BOTTOM:
        props = this.calculateRightBottom(s, h);
        break;
      case OutsidePlacement.LEFT_TOP:
        props = this.calculateLeftTop(s, h);
        break;
      case OutsidePlacement.LEFT_BOTTOM:
        props = this.calculateLeftBottom(s, h);
        break;
    }
    return { ...props, width: this.hostWidth, height: this.hostHeight };
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

  private resetCoOrds(element: HTMLElement) {
    // element.style.width = '';
    // element.style.height = '';
    element.style.top = '';
    element.style.bottom = '';
    element.style.left = '';
    element.style.right = '';
    return element;
  }

  private calculateTop(src, host) {
    const left = src.left + (src.width - host.width) / 2;
    const top = src.top - host.height;
    return { left, top };
  }
  private calculateBottom(src, host) {
    const left = src.left + (src.width - host.width) / 2;
    const top = src.top + src.height;
    return { left, top };
  }
  private calculateLeft(src, host) {
    const left = src.left - host.width;
    const top = src.top + (src.height - host.height) / 2;
    return { left, top };
  }
  private calculateRight(src, host) {
    const left = src.right;
    const top = src.top + (src.height - host.height) / 2;
    return { left, top };
  }

  private calculateTopLeft(src, host) {
    const left = src.left;
    const top = src.top - host.height;
    return { left, top };
  }
  private calculateTopRight(src, host) {
    const left = src.left + src.width - host.width;
    const top = src.top - host.height;
    return { left, top };
  }
  private calculateBottomLeft(src, host) {
    const left = src.left;
    const top = src.top + src.height;
    return { left, top };
  }
  private calculateBottomRight(src, host) {
    const left = src.left + src.width - host.width;
    const top = src.top + src.height;
    return { left, top };
  }

  private calculateLeftTop(src, host) {
    const left = src.left - host.width;
    const top = src.top;
    return { left, top };
  }
  private calculateLeftBottom(src, host) {
    const left = src.left - host.width;
    const top = src.top + src.height - host.height;
    return { left, top };
  }

  private calculateRightTop(src, host) {
    const left = src.right;
    const top = src.top;
    return { left, top };
  }
  private calculateRightBottom(src, host) {
    const left = src.right;
    const top = src.top + src.height - host.height;
    return { left, top };
  }
}
