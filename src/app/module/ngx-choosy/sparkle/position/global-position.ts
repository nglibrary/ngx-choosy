import { Position } from './position';
import { ContainerSize, OutsidePlacement } from '../models';

export class GlobalPosition extends Position {
  private size;
  constructor(public placement: OutsidePlacement) {
    super();
  }
  getPositions(host?: HTMLElement, size?: ContainerSize) {
    this.size = size;
    return this.calc();
  }

  private calc() {
    switch (this.placement) {
      case OutsidePlacement.BOTTOM:
        return { ...this.size, left: 0, bottom: 0 };
      case OutsidePlacement.TOP:
        return { ...this.size, left: 0, top: 0 };
      default:
        break;
    }
  }
}
