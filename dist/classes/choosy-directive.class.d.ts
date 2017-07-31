import { ComponentFactoryResolver, ComponentRef, ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { ChoosyResultsComponent } from '../components';
import { ChoosyManagerService } from '../services';
export declare abstract class ChoosyDirective {
    protected compRef: ComponentRef<ChoosyResultsComponent>;
    protected renderer: Renderer;
    protected compFacResolver: ComponentFactoryResolver;
    protected viewContainerRef: ViewContainerRef;
    protected elRef: ElementRef;
    protected compIns: ChoosyResultsComponent;
    protected compEl: HTMLElement;
    protected insID: string;
    protected choosyManager: ChoosyManagerService;
    protected createChoosyInstance(): void;
    protected closeOnOutsideClick(el: HTMLElement, event: any): void;
    protected closeOthersToggleThis(): void;
    protected applyDropdownSpan(mode?: string, el?: any, fixedWidth?: number): void;
    protected destroyComp(): void;
    open(): void;
    close(): void;
    toggle(): void;
}
