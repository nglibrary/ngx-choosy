import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { ChoosyConfig } from '../../interfaces';
export declare class ChoosySearchComponent implements AfterViewInit, OnDestroy {
    private elRef;
    config: ChoosyConfig;
    search: EventEmitter<any>;
    inputEl: ElementRef;
    constructor(elRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onChange(keyword: string): void;
}
