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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, Renderer, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChoosyDirective } from '../../classes';
import { ChoosyConfigService, ChoosyManagerService } from '../../services';
var ChoosySingleSelectDirective = (function (_super) {
    __extends(ChoosySingleSelectDirective, _super);
    function ChoosySingleSelectDirective(globalConfig, elRef, renderer, viewContainerRef, compFacResolver, choosyManager) {
        var _this = _super.call(this) || this;
        _this.globalConfig = globalConfig;
        _this.elRef = elRef;
        _this.renderer = renderer;
        _this.viewContainerRef = viewContainerRef;
        _this.compFacResolver = compFacResolver;
        _this.choosyManager = choosyManager;
        _this.options = [];
        _this.config = {};
        _this.choosy = new EventEmitter();
        _this.onChange = function (_) { };
        _this.onTouched = function (_) { };
        _this.createChoosyInstance();
        return _this;
    }
    ChoosySingleSelectDirective.prototype.ngOnInit = function () {
        if (typeof this.options[0] === 'object' && !this.config.displayValue) {
            this.config.displayValue = Object.keys(this.options[0])[0];
        }
        this.config = this.globalConfig.getConfig(this.config);
        this.elRef.nativeElement.readOnly = true;
        this.compIns.config = this.config;
        this.compIns.options = this.options;
    };
    ChoosySingleSelectDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.applyDropdownSpan(this.config.dropdown.size, this.elRef.nativeElement, this.config.dropdown.width);
        this.compIns.template = this.template;
        this.choosy.emit(this.prepareEvents(this.compIns.expose()));
        this.compIns.selections.subscribe(function (r) {
            var val = _this.config.displayValue ? r[_this.config.displayValue] : r;
            _this.setValue(val);
            _this.onChange(r);
            _this.compIns.close();
        });
        if (this.initialValue) {
            var val = this.config.displayValue
                ? this.initialValue[this.config.displayValue]
                : this.initialValue;
        }
    };
    ChoosySingleSelectDirective.prototype.ngOnDestroy = function () {
        this.destroyComp();
    };
    ChoosySingleSelectDirective.prototype.ngOnChanges = function (change) {
        if (change.options && !change.options.firstChange) {
            this.options = change.options.currentValue;
            this.compIns.reloadOptions(this.options);
        }
        if (change.config) {
            this.config = this.compIns.config = this.globalConfig.getConfig(change.config.currentValue);
        }
        // TODO merge original and dynamic config
    };
    ChoosySingleSelectDirective.prototype.documentClickEvent = function (event) {
        this.closeOnOutsideClick(this.elRef.nativeElement, event);
    };
    ChoosySingleSelectDirective.prototype.clickEvent = function (event) {
        this.closeOthersToggleThis();
    };
    ChoosySingleSelectDirective.prototype.windowResize = function (event) {
        var _a = this.config.dropdown, size = _a.size, width = _a.width;
        if (size == 'AUTO') {
            this.applyDropdownSpan('AUTO', this.elRef.nativeElement, width);
        }
    };
    ChoosySingleSelectDirective.prototype.prepareEvents = function (componentEvent) {
        return __assign({}, componentEvent, { clear: this.clear.bind(this) });
    };
    ChoosySingleSelectDirective.prototype.writeValue = function (value) {
        if (!value)
            return;
        this.initialValue = value;
        var val = this.config.displayValue ? value[this.config.displayValue] : value;
        if (!value) {
            this.setValue(null);
            return;
        }
        this.setValue(val);
        this.onChange(val);
    };
    ChoosySingleSelectDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    ChoosySingleSelectDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    ChoosySingleSelectDirective.prototype.isOpen = function () {
        return this.compIns.isOpened();
    };
    ChoosySingleSelectDirective.prototype.setValue = function (value) {
        this.renderer.setElementProperty(this.elRef.nativeElement, 'value', value);
    };
    ChoosySingleSelectDirective.prototype.clear = function () {
        this.setValue(null);
        this.onChange(null);
        this.compIns.clearSelectedOptions();
    };
    return ChoosySingleSelectDirective;
}(ChoosyDirective));
export { ChoosySingleSelectDirective };
ChoosySingleSelectDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[choosySingleSelect]',
                exportAs: 'choosy',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return ChoosySingleSelectDirective; }),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
ChoosySingleSelectDirective.ctorParameters = function () { return [
    { type: ChoosyConfigService, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
    { type: ChoosyManagerService, },
]; };
ChoosySingleSelectDirective.propDecorators = {
    'options': [{ type: Input },],
    'config': [{ type: Input },],
    'template': [{ type: Input },],
    'choosy': [{ type: Output },],
    'documentClickEvent': [{ type: HostListener, args: ['document:click', ['$event'],] },],
    'clickEvent': [{ type: HostListener, args: ['click', ['$event'],] },],
    'windowResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    'onChange': [{ type: HostListener, args: ['input', ['$event.target.value'],] },],
    'onTouched': [{ type: HostListener, args: ['blur', [],] },],
};
//# sourceMappingURL=choosy-single-select.directive.js.map