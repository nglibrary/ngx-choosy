import { PositionCoOrds, SlidePositionDirection } from '../models';
import { Position } from './position';

export class SlidePosition extends Position {
  private direction: SlidePositionDirection;
  private width: string;
  constructor({ direction = 'LEFT', width = '30%' }: any) {
    super();
    this.direction = direction;
    this.width = width;
  }
  getPositions(): PositionCoOrds {
    const props = this.direction === 'LEFT' ? { left: 0 } : { right: 0 };
    return { ...props, top: 0, width: this.width, height: '100%', position: 'fixed' };
  }
}
