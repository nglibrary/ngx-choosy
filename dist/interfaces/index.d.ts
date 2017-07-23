import { Subject } from 'rxjs/Subject';
export interface FuseConfig {
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
export interface ChoosyFooterConfig {
    enable?: boolean;
    countSummary?: boolean;
}
export interface ChoosyConfig {
    _local?: Object;
    labels?: ChoosyLablesConfig;
    theme?: string;
    search?: FuseConfig;
    autocomplete?: Object;
    dropdown?: ChoosyDropdownConfig;
    keyboardShortcuts?: Object;
    footer?: ChoosyFooterConfig;
}
export interface ChoosyDropdownConfig {
    width: number;
    height: number;
    animation: boolean;
}
export interface ChoosyLablesConfig {
    inputPlaceholder?: string;
    searchPlaceholder?: string;
    noResultsToDisplay?: string;
    noOptionsToDisplay?: string;
    noOptionsProvided?: string;
    XRecordsMatches?: string;
    XRecords?: string;
}
export declare type ChoosyRawOption = string | object | number;
export interface ChoosyOption {
    uid: number | string;
    props: {
        disabled: boolean;
        selected: boolean;
        hidden: boolean;
    };
    value: string | object | null;
}
export interface ChoosyNotification {
    action: string;
    value: any;
}
export interface ChoosyDropdownExpose {
    actions: {
        open(event: Event): void;
        close(event: Event): void;
        toggle(event: Event): void;
        updateConfig(config: Object): void;
        addOption(option: ChoosyRawOption): void;
        removeOption(fn: Function): void;
        selectOption(option: ChoosyRawOption): void;
        disableOption(fn: Function): void;
        clearDisabledOption(option: ChoosyOption): void;
        clearDisabledOptions(): void;
        clearSelectedOption(option: ChoosyOption): void;
        clearSelectedOptions(): void;
        resetOptions(): void;
        getSelectedOptions(): Array<ChoosyRawOption>;
        reloadOptions(): void;
    };
    notifications: Subject<ChoosyNotification>;
    selections: Subject<ChoosyRawOption>;
}
export interface ChoosyFooterType {
    type: string;
    data: any;
}
export interface ChoosySingleSelectConfig extends ChoosyConfig {
    displayValue: any;
    wrapInput?: boolean;
}
