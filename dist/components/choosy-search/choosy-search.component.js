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
                template: "\n    <div class=\"c-search-wrapper\">\n      <input type=\"text\" (input)=\"onChange($event.target.value)\" [placeholder]=\"config?.labels?.searchPlaceholder\" #inputEl class=\"c-search-input\">\n      <i></i>\n    </div>\n  ",
                styles: ["\n    :host(){display:block;border:1px solid #cad8d8;border-radius:0;border-width:0 0 1px 0;background:#fbfbfb}.c-search-wrapper{display:flex;align-items:center}.c-search-wrapper input{border:0;background:transparent;padding:5px 8px;flex:1;font-family:inherit;font-size:inherit}.c-search-wrapper input:focus{outline:none}.c-search-wrapper i{padding:10px;color:rgba(0,0,0,0.38)}\n  "]
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