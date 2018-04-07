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
  position?: string;
}
export enum InsidePlacement {
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
export enum OutsidePlacement {
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  LEFT_TOP,
  LEFT_BOTTOM,
  RIGHT_TOP,
  RIGHT_BOTTOM
}

export interface ContainerSize {
  width: string | number;
  height: string | number;
}

export interface OverlayInstanceConfig {
  backdrop: boolean;
  containerClass: string;
  hostContainerClass: string;
  watchWindowResize: boolean;
  watchDocClick: boolean;
  windowResizeCallback: () => void;
  docClickCallback: () => void;
  parentElement: HTMLElement | null;
}

export interface ComponentType<T> {
  new (...args: any[]): T;
}

export type Props<T> = { [P in keyof T]?: T[P] };

export type SlidePositionDirection = 'LEFT' | 'RIGHT';

export interface MessengerEvent {
  name: string;
  data: any;
}
