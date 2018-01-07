export interface ChoosyConfig {
  search: any;
  footer: any;
}

export interface ChoosyOption {
  uid: any;
  state: {
    disabled: boolean;
    selected: boolean;
    hidden: boolean;
  };
  value: string | object;
}

export type ChoosyOptions = ChoosyOption[];

// TODO: add all
export type ChoosyEvent = 'optionSelected' | 'optionsAdded';
