import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { ChoosyResultsComponent } from './../../components/choosy-results/choosy-results.component';
import { ChoosyButtonSelectConfig } from './../../interfaces';
export declare class ChoosyButtonSelectDirective {
    private eRef;
    private renderer;
    private viewContainerRef;
    private compFacResolver;
    private cdRef;
    options: Array<any>;
    config: ChoosyButtonSelectConfig;
    itemTemplate: TemplateRef<any>;
    selectedItemTemplate: TemplateRef<any>;
    localConfig: any;
    componentRef: ComponentRef<ChoosyResultsComponent>;
    static compInstances: any;
    constructor(eRef: ElementRef, renderer: Renderer, viewContainerRef: ViewContainerRef, compFacResolver: ComponentFactoryResolver, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    closeDropdown(): void;
    toggleDropdown(event: Event): void;
    onDocumentClick(event: any): void;
    wrapInput(): void;
    clickEvent(event: Event): void;
    documentClickEvent(event: Event): void;
}
