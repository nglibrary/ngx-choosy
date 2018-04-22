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
  LEFT,
  RIGHT,
  CENTER,
  BOTTOM,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT
}
export enum OutsidePlacement {
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
  LEFT_TOP,
  TOP_LEFT,
  RIGHT_TOP,
  TOP_RIGHT,
  BOTTOM_LEFT,
  LEFT_BOTTOM,
  BOTTOM_RIGHT,
  RIGHT_BOTTOM
}

export enum SlidePlacement {
  LEFT,
  RIGHT
}

export interface ContainerSize {
  width: string | number;
  height: string | number;
}

export interface OverlayInstanceConfig {
  backdrop: boolean;
  containerClass: string;
  hostContainerClass: string;
  backdropClass: string;
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

export type SlidePositionDirection = "LEFT" | "RIGHT";

export interface MessengerEvent {
  name: string;
  data: any;
}
