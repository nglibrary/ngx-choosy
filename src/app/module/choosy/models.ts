export interface Config {
  search?: any;
  footer?: Footer;
  dropdown?: any;
  displayValue?: any;
  type?: any;
  theme?: Theme;
  multiselect?: Multiselect;
  autocomplete?: Autocomplete;
  groupBy?: string | null;
}

export interface Option {
  uid: any;
  state: {
    disabled: boolean;
    selected: boolean;
    hidden: boolean;
    active: boolean;
  };
  value: string | object;
}

export interface Footer {
  enable?: boolean;
}
export interface Multiselect {
  removeOnSelect?: boolean;
  checkbox?: boolean;
}
export interface Autocomplete {
  minChars?: number;
}

export type Options = Option[];

// TODO: add all
export type Event = 'optionSelected' | 'optionsAdded';

export type Position = 'AUTO' | 'FIXED';

export type Theme = 'default' | 'modern' | 'skeleton' | 'freestyle';
