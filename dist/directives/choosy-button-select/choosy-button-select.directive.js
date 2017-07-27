import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, Renderer, ViewContainerRef } from '@angular/core';
import * as merge from 'deepmerge';
import { ChoosyResultsComponent } from './../../components/choosy-results/choosy-results.component';
var ChoosyButtonSelectDirective = (function () {
    function ChoosyButtonSelectDirective(eRef, renderer, viewContainerRef, compFacResolver) {
        this.eRef = eRef;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.compFacResolver = compFacResolver;
        this.options = [];
        this.config = {};
        this.localConfig = {
            search: {
                enable: false
            },
            footer: {
                enable: false
            },
            dropdown: {
                width: 300,
                animation: true
            }
        };
        var factory = this.compFacResolver.resolveComponentFactory(ChoosyResultsComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory, 0);
        ChoosyButtonSelectDirective.compInstances.push(this.componentRef.instance);
    }
    ChoosyButtonSelectDirective.prototype.ngOnInit = function () {
        this.componentRef.instance.config = this.config = merge(this.config, this.localConfig);
        this.componentRef.instance.options = this.options;
    };
    ChoosyButtonSelectDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.wrapInput();
        this.componentRef.instance.template = this.itemTemplate;
        this.componentRef.instance.selections.subscribe(function (r) {
            _this.componentRef.instance.isOpen = false;
        });
    };
    ChoosyButtonSelectDirective.prototype.closeDropdown = function () {
        this.componentRef.instance.close();
    };
    ChoosyButtonSelectDirective.prototype.toggleDropdown = function (event) {
        this.componentRef.instance.toggle();
    };
    ChoosyButtonSelectDirective.prototype.onDocumentClick = function (event) {
        if (!this.componentRef.instance.elRef.nativeElement.contains(event.target)) {
            this.closeDropdown();
        }
    };
    ChoosyButtonSelectDirective.prototype.wrapInput = function () {
        var wrapper = document.createElement('div');
        wrapper.setAttribute('style', 'position: relative;display: inline-block;text-align: left;');
        wrapper.style.width = this.config.dropdown.width + "px";
        this.eRef.nativeElement.parentNode.insertBefore(wrapper, this.eRef.nativeElement);
        wrapper.appendChild(this.eRef.nativeElement);
        wrapper.appendChild(this.componentRef.instance.elRef.nativeElement);
    };
    ChoosyButtonSelectDirective.prototype.clickEvent = function (event) {
        ChoosyButtonSelectDirective.compInstances.forEach(function (comp) {
            comp.close(new Event('click'));
        });
        this.toggleDropdown(event);
    };
    ChoosyButtonSelectDirective.prototype.documentClickEvent = function (event) {
        this.onDocumentClick(event);
    };
    return ChoosyButtonSelectDirective;
}());
export { ChoosyButtonSelectDirective };
ChoosyButtonSelectDirective.compInstances = [];
ChoosyButtonSelectDirective.decorators = [
    { type: Directive, args: [{ selector: '[choosyButtonSelect]' },] },
];
/** @nocollapse */
ChoosyButtonSelectDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
]; };
ChoosyButtonSelectDirective.propDecorators = {
    'options': [{ type: Input },],
    'config': [{ type: Input },],
    'itemTemplate': [{ type: Input },],
    'selectedItemTemplate': [{ type: Input },],
    'clickEvent': [{ type: HostListener, args: ['click', ['$event'],] },],
    'documentClickEvent': [{ type: HostListener, args: ['document:click', ['$event'],] },],
};
//# sourceMappingURL=choosy-button-select.directive.js.map