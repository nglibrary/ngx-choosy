import { Position } from './position';
import { InsidePlacement } from '../models';

export interface Config {
  placement?: InsidePlacement;
  offset?: number;
  hostWidth?: string | number;
  hostHeight?: string | number;
}
export class GlobalPosition extends Position {
  private size;
  placement: InsidePlacement;
  hostWidth: string | number;
  hostHeight: string | number;
  offset: number;
  constructor({ placement = InsidePlacement.CENTER, hostWidth = 500, hostHeight = 500, offset = 0 }: Config) {
    super();
    this.placement = placement;
    this.hostWidth = hostWidth;
    this.hostHeight = hostHeight;
    this.offset = offset;
  }
  getPositions(host?: HTMLElement) {
    console.log('got', this);
    let props;
    const src = {
      width: (Window as any).innerWidth,
      height: (Window as any).innerHeight
    };
    switch (this.placement) {
      case InsidePlacement.TOP:
        props = this.calculateTop(src, host);
        break;
      case InsidePlacement.BOTTOM:
        props = this.calculateBottom(src, host);
        break;
      default:
        break;
    }
    console.log('props', props);
    return { ...props, width: this.hostWidth, height: this.hostHeight };
  }

  private calculateTop(src, host) {
    const top = this.offset;
    const left = (src.width - host.width) / 2;
    return { left, top };
  }
  private calculateBottom(src, host) {
    const bottom = this.offset;
    const left = (src.width - host.width) / 2;
    return { left, top };
  }
  private calculateLeft(src, host) {}
  private calculateRight(src, host) {}
  private calculateCenter(src, host) {}
  private calculateTopLeft(src, host) {}
  private calculateTopRight(src, host) {}
  private calculateBottomLeft(src, host) {}
  private calculateBottomRight(src, host) {}
}
