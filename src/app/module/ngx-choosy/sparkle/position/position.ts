import { PositionCoOrds, ContainerSize } from '../models';

export abstract class Position {
  abstract getPositions(host: HTMLElement, size?: ContainerSize): PositionCoOrds;
}
