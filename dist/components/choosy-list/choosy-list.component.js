import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChildren, ViewContainerRef } from '@angular/core';
var ChoosyListComponent = (function () {
    function ChoosyListComponent(elRef, cdRef) {
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.config = {};
        this.optionSelected = new EventEmitter();
        this.scrolledToTop = false;
    }
    Object.defineProperty(ChoosyListComponent.prototype, "itemHolders", {
        set: function (itemHolders) {
            this.processCustomTemplate(itemHolders, this.template);
        },
        enumerable: true,
        configurable: true
    });
    ChoosyListComponent.prototype.ngDoCheck = function () {
        this.cdRef.detectChanges();
        if (!this.scrolledToTop)
            this.scrollToSelected();
    };
    ChoosyListComponent.prototype.optionClicked = function (event, option) {
        this.optionSelected.emit({ event: event, option: option });
    };
    ChoosyListComponent.prototype.processCustomTemplate = function (itemHolders, template) {
        var _this = this;
        if (!template)
            return;
        itemHolders.forEach(function (holder, i) {
            holder.clear();
            holder.createEmbeddedView(template, {
                $implicit: _this.options[i].value
            }, 0);
        });
        this.cdRef.detectChanges();
    };
    ChoosyListComponent.prototype.scrollToSelected = function () {
        var elem = this.elRef.nativeElement.querySelector('.selected');
        var parentElem = this.elRef.nativeElement.querySelector('.c-list-wrapper');
        if (elem && parentElem)
            parentElem.scrollTop = elem.offsetTop;
        this.scrolledToTop = true;
    };
    return ChoosyListComponent;
}());
export { ChoosyListComponent };
ChoosyListComponent.decorators = [
    { type: Component, args: [{
                selector: 'choosy-list',
                template: "\n    <div class=\"c-list-wrapper\" [style.maxHeight]=\"config.dropdown.height+'px'\">\n      <div class=\"c-list-option\" [ngClass]=\"{\n        'disabled':option.props.disabled ,\n        'selected':option.props.selected\n        }\" *ngFor=\"let option of options\" (click)=\"!option.props.disabled && optionClicked($event,option)\" #itemelem [tabIndex]=\"i+2\">\n        <ng-template #itemHolder></ng-template>\n        <ng-container *ngIf=\"!template\"> {{option.value}}</ng-container>\n      </div>\n    </div>\n  ",
                styles: ["\n    :host(){display:block}.c-list-wrapper{overflow-x:auto;position:relative}.c-list-wrapper::-webkit-scrollbar{width:7px}.c-list-wrapper::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 2px #cad8d8}.c-list-wrapper::-webkit-scrollbar-thumb{background-color:#dadfe9;outline:1px solid #2dd80e}.c-list-wrapper:hover::-webkit-scrollbar{width:10px}.c-list-option{padding:7px 10px;cursor:pointer;line-height:1.4}.c-list-option:hover{background:#f6f8fa;outline:1px solid #e3e6e8}.c-list-option.selected{background:#00cbe2;color:#fff}.c-list-option.disabled,.c-list-option.selected.disabled{background:#f5f8f9;opacity:0.5;cursor:not-allowed}\n  "]
            },] },
];
/** @nocollapse */
ChoosyListComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
]; };
ChoosyListComponent.propDecorators = {
    'options': [{ type: Input },],
    'config': [{ type: Input },],
    'template': [{ type: Input, args: ['template',] },],
    'optionSelected': [{ type: Output },],
    'itemHolders': [{ type: ViewChildren, args: ['itemHolder', { read: ViewContainerRef },] },],
};
//# sourceMappingURL=choosy-list.component.js.map