import { ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
import { ChoosyOption } from './../../interfaces/index';
export declare class ChoosyListComponent implements DoCheck {
    private elRef;
    private cdRef;
    options: Array<any>;
    config: any;
    template: TemplateRef<any>;
    optionSelected: EventEmitter<any>;
    itemHolders: QueryList<ViewContainerRef>;
    userTemplate: TemplateRef<any>;
    private scrolledToTop;
    constructor(elRef: ElementRef, cdRef: ChangeDetectorRef);
    ngDoCheck(): void;
    optionClicked(event: Event, option: ChoosyOption): void;
    private processCustomTemplate(itemHolders, template);
    private scrollToSelected();
}
