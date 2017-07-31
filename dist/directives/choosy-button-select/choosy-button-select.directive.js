var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, Renderer, ViewContainerRef } from '@angular/core';
import * as merge from 'deepmerge';
import { ChoosyDirective } from '../../classes';
import { ChoosyManagerService } from '../../services';
var ChoosyButtonSelectDirective = (function (_super) {
    __extends(ChoosyButtonSelectDirective, _super);
    function ChoosyButtonSelectDirective(elRef, renderer, viewContainerRef, compFacResolver, choosyManager) {
        var _this = _super.call(this) || this;
        _this.elRef = elRef;
        _this.renderer = renderer;
        _this.viewContainerRef = viewContainerRef;
        _this.compFacResolver = compFacResolver;
        _this.choosyManager = choosyManager;
        _this.options = [];
        _this.config = {};
        _this.localConfig = {
            search: {
                enable: false
            },
            footer: {
                enable: false
            },
            dropdown: {
                width: 300,
                height: 'none',
                animation: true
            }
        };
        _this.createChoosyInstance();
        return _this;
    }
    ChoosyButtonSelectDirective.prototype.ngOnInit = function () {
        this.compIns.config = this.config = merge(this.localConfig, this.config);
        this.compIns.options = this.options;
    };
    ChoosyButtonSelectDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.renderer.listen(this.elRef.nativeElement, 'focus', function (e) {
            _this.applyDropdownSpan(_this.config.dropdown.size, e.target, _this.config.dropdown.width);
        });
        this.compIns.template = this.itemTemplate;
        this.compIns.selections.subscribe(function (r) {
            var view = _this.viewContainerRef.createEmbeddedView(_this.selectedItemTemplate, {
                $implicit: r
            }, 0);
            _this.renderer.setElementProperty(_this.elRef.nativeElement, 'innerHTML', '');
            _this.renderer.invokeElementMethod(_this.elRef.nativeElement, 'appendChild', [view.rootNodes[0].nextSibling]);
            _this.compIns.close();
        });
    };
    ChoosyButtonSelectDirective.prototype.ngOnDestroy = function () {
        this.destroyComp();
    };
    ChoosyButtonSelectDirective.prototype.clickEvent = function () {
        this.closeOthersToggleThis();
    };
    ChoosyButtonSelectDirective.prototype.documentClickEvent = function (event) {
        this.closeOnOutsideClick(this.elRef.nativeElement, event);
    };
    return ChoosyButtonSelectDirective;
}(ChoosyDirective));
export { ChoosyButtonSelectDirective };
ChoosyButtonSelectDirective.decorators = [
    { type: Directive, args: [{ selector: '[choosyButtonSelect]' },] },
];
/** @nocollapse */
ChoosyButtonSelectDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
    { type: ChoosyManagerService, },
]; };
ChoosyButtonSelectDirective.propDecorators = {
    'options': [{ type: Input },],
    'config': [{ type: Input },],
    'itemTemplate': [{ type: Input },],
    'selectedItemTemplate': [{ type: Input },],
    'clickEvent': [{ type: HostListener, args: ['click', [],] },],
    'documentClickEvent': [{ type: HostListener, args: ['document:click', ['$event'],] },],
};
//# sourceMappingURL=choosy-button-select.directive.js.map