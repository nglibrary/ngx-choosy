import { AfterViewInit, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { ChoosyDirective } from '../../classes';
import { ChoosyManagerService } from '../../services';
import { ChoosyButtonSelectConfig } from './../../interfaces';
export declare class ChoosyButtonSelectDirective extends ChoosyDirective implements OnInit, AfterViewInit, OnDestroy {
    elRef: ElementRef;
    renderer: Renderer;
    viewContainerRef: ViewContainerRef;
    compFacResolver: ComponentFactoryResolver;
    choosyManager: ChoosyManagerService;
    options: Array<any>;
    config: ChoosyButtonSelectConfig;
    itemTemplate: TemplateRef<any>;
    selectedItemTemplate: TemplateRef<any>;
    localConfig: any;
    constructor(elRef: ElementRef, renderer: Renderer, viewContainerRef: ViewContainerRef, compFacResolver: ComponentFactoryResolver, choosyManager: ChoosyManagerService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    clickEvent(): void;
    documentClickEvent(event: Event): void;
}
