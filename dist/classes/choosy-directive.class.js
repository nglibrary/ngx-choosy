import { ChoosyResultsComponent } from '../components';
var ChoosyDirective = (function () {
    function ChoosyDirective() {
    }
    ChoosyDirective.prototype.createChoosyInstance = function () {
        var factory = this.compFacResolver.resolveComponentFactory(ChoosyResultsComponent);
        this.compRef = this.viewContainerRef.createComponent(factory, 0);
        this.compIns = this.compRef.instance;
        this.compEl = this.compRef.instance.elRef.nativeElement;
        this.insID = Math.random().toString(36).substr(2, 5);
        this.choosyManager.addInstance(this.compIns, this.insID);
    };
    ;
    ChoosyDirective.prototype.closeOnOutsideClick = function (el, event) {
        if (event.target != el &&
            event.target != this.compEl &&
            !this.compEl.contains(event.target)) {
            this.close();
        }
        event.preventDefault();
        event.stopPropagation();
        // TODO: refactor
    };
    ;
    ChoosyDirective.prototype.closeOthersToggleThis = function () {
        var _this = this;
        this.choosyManager.instances.forEach(function (comp) {
            if (comp.insID != _this.insID)
                comp.ins.close();
            else
                comp.ins.toggle();
        });
    };
    ;
    ChoosyDirective.prototype.applyDropdownSpan = function (mode, el, fixedWidth) {
        if (mode === void 0) { mode = "AUTO"; }
        if (el === void 0) { el = this.elRef.nativeElement; }
        if (fixedWidth === void 0) { fixedWidth = 0; }
        var offsetWidth = el.offsetWidth, offsetHeight = el.offsetHeight;
        var compEl = this.compEl;
        if (mode == 'AUTO') {
            var style = "width:" + offsetWidth + "px;top:" + offsetHeight + "px";
            this.renderer.setElementProperty(this.compEl, 'style', style);
        }
        else if (mode == 'FIXED') {
            var style = "width:" + fixedWidth + "px;top:" + offsetHeight + "px";
            this.renderer.setElementProperty(this.compEl, 'style', style);
        }
        else if (mode == 'PARENT') {
            this.renderer.setElementStyle(el.parentNode, 'position', 'relative');
            this.renderer.setElementStyle(this.compEl, 'left', '0px');
        }
        else if (mode == 'WRAP') { }
    };
    ;
    ChoosyDirective.prototype.destroyComp = function () {
        this.compRef.destroy();
    };
    ChoosyDirective.prototype.open = function () {
        this.compIns.open();
    };
    ChoosyDirective.prototype.close = function () {
        this.compIns.close();
    };
    ChoosyDirective.prototype.toggle = function () {
        this.compIns.toggle();
    };
    return ChoosyDirective;
}());
export { ChoosyDirective };
//# sourceMappingURL=choosy-directive.class.js.map