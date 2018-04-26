export interface ChoosyConfig {
  search?: ChoosySearch;
  footer?: ChoosyFooter;
  dropDown?: any;
  displayValue?: any;
  type?: any;
  theme?: ChoosyTheme;
  multiSelect?: ChoosyMultiSelect;
  autoComplete?: ChoosyAutoComplete;
  groupBy?: string | null;
}

export interface ChoosySearch {
  enable?: boolean;
  autoFocus?: boolean;
  hasClearBtn?: boolean;
  id?: string;
  caseSensitive?: boolean;
  includeMatches?: boolean;
  includeScore?: boolean;
  shouldSort?: boolean;
  sortFn?: (a: { score: number }, b: { score: number }) => number;
  getFn?: (obj: any, path: string) => any;
  keys?: string[];
  verbose?: boolean;
  tokenize?: boolean;
  tokenSeparator?: RegExp;
  matchAllTokens?: boolean;
  location?: number;
  distance?: number;
  threshold?: number;
  maxPatternLength?: number;
  minMatchCharLength?: number;
  findAllMatches?: boolean;
}

export interface ChoosyOption {
  uid: any;
  state: {
    disabled: boolean;
    selected: boolean;
    hidden: boolean;
    active: boolean;
    hover: boolean;
  };
  value: string | object;
}

export interface ChoosyFooter {
  enable?: boolean;
}
export interface ChoosyMultiSelect {
  enable?: boolean;
  removeOnSelect?: boolean;
  checkbox?: boolean;
}
export interface ChoosyAutoComplete {
  enable?: boolean;
  minChars?: number;
}

export type ChoosyOptions = ChoosyOption[];

// TODO: add all
export type ChoosyEvent =
  | 'optionSelected'
  | 'optionsAdded'
  | 'optionRemoved'
  | 'optionDisabled'
  | 'markedPrevAsActive'
  | 'markedNextAsActive'
  | 'removeAllActive'
  | 'clearFilteredOptions'
  | 'optionsFiltered'
  | 'configUpdated'
  | 'clearedAllSelectedOptions'
  | 'clearedSelectedOptions'
  | 'optionsEnabled'
  | 'optionEnabled'
  | 'optionHoverStateChanged'
  | 'optionSet';

export type SparklePosition = 'AUTO' | 'FIXED';

export type ChoosyTheme = 'default' | 'modern' | 'skeleton' | 'freestyle';

export type FilterInput = ((option: any) => boolean) | string;
