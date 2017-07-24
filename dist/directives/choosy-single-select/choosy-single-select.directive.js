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
import { ChoosyResultsComponent } from '../../components';
var ChoosySingleSelectDirective = (function () {
    function ChoosySingleSelectDirective(eRef, renderer, viewContainerRef, compFacResolver) {
        this.eRef = eRef;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.compFacResolver = compFacResolver;
        this.options = [];
        this.config = {};
        this.choosy = new EventEmitter();
        this.isOpen = new EventEmitter();
        this.INOOPTS = 'No options provided';
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        var factory = this.compFacResolver.resolveComponentFactory(ChoosyResultsComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory, 0);
        ChoosySingleSelectDirective.compInstances.push(this.componentRef.instance);
    }
    ChoosySingleSelectDirective.prototype.ngOnInit = function () {
        if (typeof this.options[0] === 'object' && !this.config.displayValue) {
            this.config.displayValue = Object.keys(this.options[0])[0];
        }
        this.eRef.nativeElement.readOnly = true;
        this.componentRef.instance.config = this.config;
        this.componentRef.instance.options = this.options;
    };
    ChoosySingleSelectDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.config.wrapInput ? this.wrapInput() : this.makeParentNodeRelative();
        this.componentRef.instance.template = this.template;
        this.choosy.emit(this.prepareEvents(this.componentRef.instance.expose()));
        this.componentRef.instance.selections.subscribe(function (r) {
            var val = _this.config.displayValue ? r[_this.config.displayValue] : r;
            _this.setValue(val);
            _this.onChange(r);
            _this.componentRef.instance.isOpen = false;
        });
        if (this.initialValue) {
            var val = this.config.displayValue
                ? this.initialValue[this.config.displayValue]
                : this.initialValue;
        }
    };
    ChoosySingleSelectDirective.prototype.ngOnDestroy = function () {
        this.componentRef.destroy();
    };
    ChoosySingleSelectDirective.prototype.ngOnChanges = function (change) {
        if (change.options && !change.options.firstChange) {
            this.options = change.options.currentValue;
            this.componentRef.instance.reloadOptions(this.options);
        }
        if (change.config)
            this.componentRef.instance.config = change.config.currentValue;
    };
    ChoosySingleSelectDirective.prototype.documentClickEvent = function (event) {
        this.onDocumentClick(event);
    };
    ChoosySingleSelectDirective.prototype.clickEvent = function (event) {
        ChoosySingleSelectDirective.compInstances.forEach(function (comp) {
            comp.close(new Event('click'));
        });
        this.toggleDropdown(event);
    };
    ChoosySingleSelectDirective.prototype.prepareEvents = function (componentEvent) {
        return __assign({}, componentEvent, { clear: this.clear.bind(this), selectItem: this.selectItem.bind(this) });
    };
    ChoosySingleSelectDirective.prototype.wrapInput = function () {
        var wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.height = this.eRef.nativeElement.offsetHeight + "px";
        this.eRef.nativeElement.parentNode.insertBefore(wrapper, this.eRef.nativeElement);
        wrapper.appendChild(this.eRef.nativeElement);
        wrapper.appendChild(this.componentRef.instance.elRef.nativeElement);
    };
    ChoosySingleSelectDirective.prototype.makeParentNodeRelative = function () {
        this.eRef.nativeElement.parentNode.style.position = 'relative';
    };
    ChoosySingleSelectDirective.prototype.onDocumentClick = function (event) {
        if (!this.componentRef.instance.elRef.nativeElement.contains(event.target)) {
            this.closeDropdown();
        }
    };
    ChoosySingleSelectDirective.prototype.writeValue = function (value) {
        if (!value)
            return;
        this.initialValue = value;
        var val = this.config.displayValue ? value[this.config.displayValue] : value;
        if (!value) {
            this.setValue(undefined);
            return;
        }
        this.setValue(val);
        this.onChange(val);
    };
    ChoosySingleSelectDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    ChoosySingleSelectDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    ChoosySingleSelectDirective.prototype.openDropdown = function () {
        this.componentRef.instance.open(new Event('click'));
        this.isOpen.emit(this.componentRef.instance.isOpen);
    };
    ChoosySingleSelectDirective.prototype.closeDropdown = function () {
        this.componentRef.instance.close(new Event('click'));
        this.isOpen.emit(this.componentRef.instance.isOpen);
    };
    ChoosySingleSelectDirective.prototype.toggleDropdown = function (event) {
        this.componentRef.instance.toggle(event);
        this.isOpen.emit(this.componentRef.instance.isOpen);
    };
    ChoosySingleSelectDirective.prototype.setValue = function (value) {
        this.renderer.setElementProperty(this.eRef.nativeElement, 'value', value);
    };
    ChoosySingleSelectDirective.prototype.clear = function () {
        this.setValue(null);
        this.onChange(null);
        this.componentRef.instance.clearSelectedOptions();
    };
    ChoosySingleSelectDirective.prototype.selectItem = function (option) {
        this.setValue(option);
        this.onChange(option);
        this.componentRef.instance.selectOption(option);
    };
    return ChoosySingleSelectDirective;
}());
export { ChoosySingleSelectDirective };
ChoosySingleSelectDirective.compInstances = [];
ChoosySingleSelectDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[choosySingleSelect]',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return ChoosySingleSelectDirective; }),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
ChoosySingleSelectDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
]; };
ChoosySingleSelectDirective.propDecorators = {
    'options': [{ type: Input },],
    'config': [{ type: Input },],
    'template': [{ type: Input },],
    'choosy': [{ type: Output },],
    'isOpen': [{ type: Output },],
    'documentClickEvent': [{ type: HostListener, args: ['document:click', ['$event'],] },],
    'clickEvent': [{ type: HostListener, args: ['click', ['$event'],] },],
    'onChange': [{ type: HostListener, args: ['input', ['$event.target.value'],] },],
    'onTouched': [{ type: HostListener, args: ['blur', [],] },],
};
//# sourceMappingURL=choosy-single-select.directive.js.map