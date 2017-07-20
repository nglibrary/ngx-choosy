import { Component, ElementRef, Input } from '@angular/core';
import * as C from '../../utils/constants';
var ChoosyFooterComponent = (function () {
    function ChoosyFooterComponent(elRef) {
        this.elRef = elRef;
        this.className = '';
        this.show = false;
    }
    ChoosyFooterComponent.prototype.ngOnChanges = function (changes) {
        if (!changes.type)
            return;
        var value = changes.type.currentValue;
        this.show = true;
        if (value.type === C.FOOTER_INITIAL && value.data === 0)
            this.message = this.config.labels.noOptionsToDisplay;
        else if (value.type === C.FOOTER_FILTER && value.data === 0)
            this.message = this.config.labels.noResultsToDisplay;
        else if (value.type === C.FOOTER_FILTER && value.data > 0) {
            this.message = value.data + " " + this.config.labels.XRecordsMatches;
            this.show = this.config.footer.countSummary;
        }
        else if (value.type === C.FOOTER_DEFAULT && value.data > 0) {
            this.message = value.data + " " + this.config.labels.XRecords;
            this.show = this.config.footer.countSummary;
        }
        else if (value.type === C.FOOTER_DEFAULT && value.data === 0)
            this.message = this.config.labels.noOptionsProvided;
        else
            this.show = false;
        var type = value.type.toLowerCase();
        var data = (value.data > 0) ? 'has-data' : 'no-data';
        this.className = type + " " + data;
    };
    return ChoosyFooterComponent;
}());
export { ChoosyFooterComponent };
ChoosyFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'choosy-footer',
                template: "\n    <div class=\"c-footer-wrapper\" *ngIf=\"show\" [ngClass]=\"className\">\n     <div class=\"c-footer\">{{message}}</div>\n    </div>\n  ",
                styles: [
                    ":host(){\n      display:block;\n    }\n    .c-footer{\n      padding: 7px;\n    }\n    .c-footer-wrapper.has-data{\n     border-top: 1px solid #cad8d8;\n     background: #f5f8f9;\n    }"
                ]
            },] },
];
/** @nocollapse */
ChoosyFooterComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
ChoosyFooterComponent.propDecorators = {
    'config': [{ type: Input },],
    'type': [{ type: Input },],
};
//# sourceMappingURL=choosy-footer.component.js.map