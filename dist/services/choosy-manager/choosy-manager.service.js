import { Injectable } from '@angular/core';
var ChoosyManagerService = (function () {
    function ChoosyManagerService() {
        this.instances = [];
    }
    ChoosyManagerService.prototype.addInstance = function (ins, insID) {
        this.instances.push({ ins: ins, insID: insID });
    };
    return ChoosyManagerService;
}());
export { ChoosyManagerService };
ChoosyManagerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ChoosyManagerService.ctorParameters = function () { return []; };
//# sourceMappingURL=choosy-manager.service.js.map