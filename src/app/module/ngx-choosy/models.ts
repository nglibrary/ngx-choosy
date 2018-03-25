export interface ChoosyConfig {
  search?: any;
  footer?: ChoosyFooter;
  dropdown?: any;
  displayValue?: any;
  type?: any;
  theme?: ChoosyTheme;
  multiselect?: ChoosyMultiselect;
  autocomplete?: ChoosyAutocomplete;
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

export type ChoosyTheme = 'default' | 'modern' | 'skeleton';
