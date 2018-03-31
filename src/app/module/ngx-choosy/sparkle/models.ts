export interface HtmlElementOptions {
  className?: string;
  id?: string;
  attr?: { [x: string]: any };
}

export interface PositionCoOrds {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  height?: number | string;
  width?: number | string;
}
export enum InsidePlacement {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT
}
export enum OutsidePlacement {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  CENTER
}

export interface ContainerSize {
  width: string | number;
  height: string | number;
}
