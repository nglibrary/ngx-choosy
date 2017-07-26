import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
var ChoosySearchComponent = (function () {
    function ChoosySearchComponent(elRef) {
        this.elRef = elRef;
        this.search = new EventEmitter();
    }
    ChoosySearchComponent.prototype.ngAfterViewInit = function () {
        if (this.config && this.config.search.autoFocus)
            this.inputEl.nativeElement.focus();
    };
    ChoosySearchComponent.prototype.onChange = function (keyword) {
        this.search.emit(keyword);
    };
    return ChoosySearchComponent;
}());
export { ChoosySearchComponent };
ChoosySearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'choosy-search',
                template: "\n    <div class=\"choosy-search-wrapper\">\n      <input type=\"text\" (input)=\"onChange($event.target.value)\" [placeholder]=\"config?.labels?.searchPlaceholder\" #inputEl class=\"choosy-search-input\">\n      <i></i>\n    </div>\n  ",
                styles: ["\n    :host(){display:block}\n  "]
            },] },
];
/** @nocollapse */
ChoosySearchComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
ChoosySearchComponent.propDecorators = {
    'config': [{ type: Input },],
    'search': [{ type: Output, args: ['search',] },],
    'inputEl': [{ type: ViewChild, args: ['inputEl',] },],
};
//# sourceMappingURL=choosy-search.component.js.map