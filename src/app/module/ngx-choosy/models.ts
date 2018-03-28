export interface ChoosyConfig {
  search?: any;
  footer?: ChoosyFooter;
  dropdown?: any;
  displayValue?: any;
  type?: any;
  theme?: ChoosyTheme;
  multiselect?: ChoosyMultiselect;
  autocomplete?: ChoosyAutocomplete;
  groupBy?: string | null;
}

export interface ChoosyOption {
  uid: any;
  state: {
    disabled: boolean;
    selected: boolean;
    hidden: boolean;
    active: boolean;
  };
  value: string | object;
}

export interface ChoosyFooter {
  enable?: boolean;
}
export interface ChoosyMultiselect {
  removeOnSelect?: boolean;
  checkbox?: boolean;
}
export interface ChoosyAutocomplete {
  minChars?: number;
}

export type ChoosyOptions = ChoosyOption[];

// TODO: add all
export type ChoosyEvent = 'optionSelected' | 'optionsAdded';

export type ChoosyPosition = 'AUTO' | 'FIXED';

export type ChoosyTheme = 'default' | 'modern' | 'skeleton' | 'freestyle';

export interface HtmlElementOptions {
  className?: string;
  id?: string;
  attr?: { [x: string]: string };
}

export interface ChoosyHostPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export type ChoosyHostPositionInside =
  | 'TOP'
  | 'BOTTOM'
  | 'LEFT'
  | 'RIGHT'
  | 'CENTER'
  | 'TOP RIGHT'
  | 'TOP LEFT'
  | 'BOTTOM LEFT'
  | 'BOTTOM RIGHT';

export type ChoosyHostPositionOutside = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';
