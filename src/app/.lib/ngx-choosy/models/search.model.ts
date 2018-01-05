export interface ChoosySearch {
  enable?: boolean;
  shouldSort?: boolean;
  threshold?: number;
  tokenize?: boolean;
  matchAllTokens?: boolean;
  location?: number;
  distance?: number;
  maxPatternLength?: number;
  minMatchCharLength?: number;
  keys?: Array<any>;
  autoFocus: boolean;
  hasClearBtn: boolean;
}
