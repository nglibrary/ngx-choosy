export interface ChoosyConfig {
  search?: any;
  footer?: ChoosyFooter;
  dropDown?: any;
  displayValue?: any;
  type?: any;
  theme?: ChoosyTheme;
  multiSelect?: ChoosyMultiSelect;
  autoComplete?: ChoosyAutoComplete;
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
export interface ChoosyMultiSelect {
  removeOnSelect?: boolean;
  checkbox?: boolean;
}
export interface ChoosyAutoComplete {
  minChars?: number;
}

export type ChoosyOptions = ChoosyOption[];

// TODO: add all
export type ChoosyEvent = 'optionSelected' | 'optionsAdded';

export type SparklePosition = 'AUTO' | 'FIXED';

export type ChoosyTheme = 'default' | 'modern' | 'skeleton' | 'freestyle';
