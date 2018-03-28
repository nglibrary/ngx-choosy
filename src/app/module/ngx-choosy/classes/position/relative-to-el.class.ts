import { ChoosyHostPositionOutside } from '../../models';
import { PositionAbstract } from './abstract.class';

export interface Config {
  src?: HTMLElement;
  pos?: ChoosyHostPositionOutside;
  autoUpdate?: boolean;
}

export class RelativeToElement extends PositionAbstract {
  private src: HTMLElement;
  private pos: ChoosyHostPositionOutside;
  private autoUpdate: boolean;
  constructor({ src, pos = 'TOP', autoUpdate = false }: Config = {}) {
    super();
    this.src = src;
    this.pos = pos;
    this.autoUpdate = autoUpdate;
  }
  getPositions() {
    const coords = this.getCoords(this.src);
    const left = coords.left;
    const top = coords.top + coords.height;
    return { top, left, right: 0, bottom: 0 };
  }

  private getSize(el): { x: number; y: number } {
    const { offsetWidth, offsetHeight } = el;
    const [x, y] = [offsetWidth, offsetHeight];
    return { x, y };
  }

  private getCoords(elem: HTMLElement) {
    const box = elem.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left), height: box.height };
  }
}
