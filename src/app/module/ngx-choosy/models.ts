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
