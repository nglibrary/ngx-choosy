import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { ChoosyConfig } from '../../interfaces';
export declare class ChoosySearchComponent implements AfterViewInit {
    private elRef;
    config: ChoosyConfig;
    search: EventEmitter<any>;
    inputEl: ElementRef;
    constructor(elRef: ElementRef);
    ngAfterViewInit(): void;
    onChange(keyword: string): void;
}
