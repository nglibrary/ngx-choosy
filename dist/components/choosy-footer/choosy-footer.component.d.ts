import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ChoosyConfig } from '../../interfaces';
export declare class ChoosyFooterComponent implements OnChanges {
    private elRef;
    config: ChoosyConfig;
    type: string;
    className: string;
    show: boolean;
    message: string;
    constructor(elRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
}
