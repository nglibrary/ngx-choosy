import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import * as merge from 'deepmerge';
import * as FuseSearch from 'fuse.js';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ChoosyConfigService } from './../../services/choosy-config/choosy-config.service';
import * as C from './../../utils/constants';
import { formatRawOption } from './../../utils/helpers';
var ChoosyResultsComponent = (function () {
    function ChoosyResultsComponent(elRef, configService, cdRef) {
        this.elRef = elRef;
        this.configService = configService;
        this.cdRef = cdRef;
        this.choosy = new EventEmitter();
        this.config = {};
        this.originalOptions = [];
        this.processedOptions = [];
        this.selections = new Subject();
        this.isOpen = false;
        this.notifications = new BehaviorSubject({ action: 'Initated', value: null });
        this.results = new Subject();
    }
    Object.defineProperty(ChoosyResultsComponent.prototype, "template", {
        set: function (template) {
            this.optionTpl = template;
            this.cdRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    ChoosyResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.options)
            throw new Error(C.MSG_NO_OPTIONS);
        if (!Array.isArray(this.options))
            throw new Error(C.ERR_INVALID_OPTIONS);
        this.config = this.configService.getConfig(this.config);
        this.originalOptions = this.options
            .map(function (option) { return formatRawOption(option); });
        this.resultsSubscription = this.results.subscribe(function (options) {
            _this.originalOptions = _this.processedOptions = options;
            _this.notifications.next({ action: C.OPTIONS_REFRESHED, value: _this.originalOptions });
        });
        this.results.next(this.originalOptions);
        this.choosy.emit(this.expose());
    };
    ChoosyResultsComponent.prototype.ngOnDestroy = function () {
        if (this.resultsSubscription)
            this.resultsSubscription.unsubscribe();
    };
    ChoosyResultsComponent.prototype.isOpened = function () {
        return this.isOpen;
    };
    ChoosyResultsComponent.prototype.open = function () {
        if (this.isOpen)
            return;
        this.isOpen = true;
        this.processedOptions = merge([], this.originalOptions);
        this.footerType = { type: C.FOOTER_DEFAULT, data: this.processedOptions.length };
        this.notifications.next({ action: C.DROPDOWN_OPENED, value: null });
        this.stopPropagation();
    };
    ChoosyResultsComponent.prototype.close = function () {
        if (!this.isOpen)
            return;
        this.isOpen = false;
        this.notifications.next({ action: C.DROPDOWN_CLOSED, value: null });
        this.stopPropagation();
    };
    ChoosyResultsComponent.prototype.toggle = function () {
        if (this.isOpen)
            this.close();
        else
            this.open();
        this.stopPropagation();
    };
    ChoosyResultsComponent.prototype.optionSelectionListener = function (res) {
        this.optionClicked(res.event);
        this.selectOption(res.option.value);
    };
    ChoosyResultsComponent.prototype.selectOption = function (option) {
        this.processedOptions = this.originalOptions.map(function (o) {
            o.props.selected = false;
            if (o.value === option)
                o.props.selected = true;
            return o;
        });
        this.results.next(this.processedOptions);
        this.selections.next(option);
        this.notifications.next({ action: C.OPTION_SELECTED, value: option });
    };
    ChoosyResultsComponent.prototype.disableOption = function (fn) {
        this.processedOptions = this.originalOptions.filter(function (o) {
            o.props.disabled = fn(o.value);
            return o;
        });
        this.results.next(this.processedOptions);
        this.notifications.next({ action: C.OPTION_DISABLED, value: null });
    };
    ChoosyResultsComponent.prototype.clearDisabledOption = function (option) {
        this.processedOptions = this.processedOptions.map(function (o) {
            if (o.value === option)
                o.props.disabled = false;
            return o;
        });
        this.results.next(this.processedOptions);
        this.notifications.next({ action: C.CLEARED_DISABLED_OPTION, value: option });
    };
    ChoosyResultsComponent.prototype.clearDisabledOptions = function () {
        this.processedOptions = this.processedOptions.map(function (o) {
            o.props.disabled = false;
            return o;
        });
        this.results.next(this.processedOptions);
        this.notifications.next({ action: C.CLEARED_DISABLED_OPTIONS, value: null });
    };
    ChoosyResultsComponent.prototype.addOption = function (options) {
        if (!Array.isArray(options))
            options = [options];
        options = options.map(function (option) { return formatRawOption(option); });
        this.originalOptions = this.originalOptions.concat(options);
        this.results.next(this.originalOptions);
        this.notifications.next({ action: C.NEW_OPTION_ADDED, value: options });
    };
    ChoosyResultsComponent.prototype.removeOption = function (fn) {
        this.originalOptions = this.originalOptions.filter(function (o) { return !fn(o.value); });
        this.results.next(this.originalOptions);
        this.notifications.next({ action: C.OPTION_REMOVED, value: null });
    };
    ChoosyResultsComponent.prototype.filterOptions = function (keyword) {
        this.fuseSearch = new FuseSearch(this.originalOptions, this.config.search);
        this.processedOptions = (keyword.length > 0)
            ? this.fuseSearch.search(keyword)
            : merge([], this.originalOptions);
        this.footerType = { type: C.FOOTER_FILTER, data: this.processedOptions.length };
        this.notifications.next({ action: C.OPTION_FILTERED, value: keyword });
    };
    ChoosyResultsComponent.prototype.clearSelectedOption = function (option) {
        this.processedOptions = this.processedOptions.map(function (o) {
            if (o.value === option)
                o.props.selected = false;
            return o;
        });
        this.results.next(this.processedOptions);
        this.notifications.next({ action: C.SELECTED_OPTION_CLEARED, value: option });
    };
    ChoosyResultsComponent.prototype.clearSelectedOptions = function () {
        this.processedOptions = this.processedOptions.map(function (o) {
            o.props.selected = false;
            return o;
        });
        this.results.next(this.processedOptions);
        this.notifications.next({ action: C.SELECTED_OPTIONS_CLEARED, value: null });
    };
    ChoosyResultsComponent.prototype.optionClicked = function (event) {
        this.notifications.next({ action: C.OPTION_CLICKED, value: event });
    };
    ChoosyResultsComponent.prototype.getSelectedOptions = function () {
        return this.processedOptions
            .filter(function (o) { return o.props.selected; })
            .map(function (o) { return o.value; });
    };
    ChoosyResultsComponent.prototype.reloadOptions = function (options) {
        var newOptions = options.map(function (option) { return formatRawOption(option); });
        this.originalOptions = newOptions;
        this.results.next(this.originalOptions);
        this.notifications.next({ action: C.OPTIONS_RELOADED, value: options });
    };
    ChoosyResultsComponent.prototype.updateConfig = function (config) {
        this.config = merge(this.config, config);
    };
    ChoosyResultsComponent.prototype.resetOptions = function () {
        this.processedOptions = this.originalOptions = this.options
            .map(function (option) { return formatRawOption(option); });
        this.results.next(this.originalOptions);
        this.notifications.next({ action: C.OPTIONS_RESET, value: null });
    };
    ChoosyResultsComponent.prototype.expose = function () {
        return {
            actions: {
                isOpened: this.isOpened.bind(this),
                open: this.open.bind(this),
                close: this.close.bind(this),
                toggle: this.toggle.bind(this),
                updateConfig: this.updateConfig.bind(this),
                addOption: this.addOption.bind(this),
                removeOption: this.removeOption.bind(this),
                selectOption: this.selectOption.bind(this),
                disableOption: this.disableOption.bind(this),
                clearDisabledOption: this.clearDisabledOption.bind(this),
                clearDisabledOptions: this.clearDisabledOptions.bind(this),
                clearSelectedOption: this.clearSelectedOption.bind(this),
                clearSelectedOptions: this.clearSelectedOptions.bind(this),
                resetOptions: this.resetOptions.bind(this),
                getSelectedOptions: this.getSelectedOptions.bind(this),
                reloadOptions: this.reloadOptions.bind(this)
            },
            notifications: this.notifications,
            selections: this.selections
        };
    };
    ChoosyResultsComponent.prototype.stopPropagation = function () {
        var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation)
            e.stopPropagation();
    };
    return ChoosyResultsComponent;
}());
export { ChoosyResultsComponent };
ChoosyResultsComponent.decorators = [
    { type: Component, args: [{
                selector: 'choosy-results',
                template: "\n    <div *ngIf=\"isOpen\" class=\"{{config.theme}}\" [ngClass]=\"{'jerk':config.dropdown.animation}\">\n      <choosy-search [config]=\"config\" (search)=\"filterOptions($event)\" *ngIf=\"config.search.enable && originalOptions.length>0\"></choosy-search>\n      <choosy-list [config]=\"config\" [options]=\"processedOptions\" (optionSelected)=\"optionSelectionListener($event)\" [template]=\"optionTpl\"></choosy-list>\n      <choosy-footer *ngIf=\"config.footer.enable\" [config]=\"config\" [type]=\"footerType\"></choosy-footer>\n    </div>\n  ",
                styles: ["\n    .choosy-jerk-animation,#choosy-frame.jerk,:host>div.jerk{animation-name:jerk;animation-duration:0.2s;animation-iteration-count:1;animation-direction:normal;animation-timing-function:cubic-bezier(0.5, 0, 0, 1.25);animation-fill-mode:forwards;animation-delay:0;transition:opacity 0.15s ease-out}@keyframes jerk{0%{transform:scale(0.9) translateY(-21px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}.scrollbar,:host /deep/ .choosy-list-wrapper{overflow-x:auto;position:relative}.scrollbar::-webkit-scrollbar,:host /deep/ .choosy-list-wrapper::-webkit-scrollbar{width:7px}.scrollbar::-webkit-scrollbar-track,:host /deep/ .choosy-list-wrapper::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 2px #cad8d8}.scrollbar::-webkit-scrollbar-thumb,:host /deep/ .choosy-list-wrapper::-webkit-scrollbar-thumb{background-color:#dadfe9;outline:1px solid #2dd80e}.scrollbar:hover::-webkit-scrollbar,:host /deep/ .choosy-list-wrapper:hover::-webkit-scrollbar{width:10px}#choosy-frame,:host>div{border:1px solid #dadfe9;border-radius:3px;background-color:#fff;margin-top:3px;box-shadow:0px 17px 10px -10px rgba(0,0,0,0.1);padding:10px;overflow:hidden;position:absolute;width:100%;z-index:9;left:0;top:100%}:host /deep/ .choosy-search-wrapper{display:flex;align-items:center;padding-bottom:10px}:host /deep/ .choosy-search-wrapper input.choosy-search-input{border-radius:3px;border:1px solid #dadfe9;background:transparent;padding:5px 8px;flex:1;font-family:inherit;font-size:inherit;outline:none}:host /deep/ .choosy-list-wrapper{overflow-x:auto;position:relative;padding:0 3px}:host /deep/ .choosy-list-wrapper .choosy-list-item{padding:7px 10px;cursor:pointer;text-align:left;border-radius:3px;outline:none;margin-bottom:2px}:host /deep/ .choosy-list-wrapper .choosy-list-item:last-child{margin-bottom:0}:host /deep/ .choosy-list-wrapper .choosy-list-item:hover,:host /deep/ .choosy-list-wrapper .choosy-list-item:focus{background:#f6f8fa;outline:none}:host /deep/ .choosy-list-wrapper .choosy-list-item.selected,:host /deep/ .choosy-list-wrapper .choosy-list-item.selected:hover,:host /deep/ .choosy-list-wrapper .choosy-list-item.selected:focus{background:#00cbe2;color:#fff}:host /deep/ .choosy-footer-wrapper{text-align:center;padding-top:10px;margin-top:10px;border-top:1px solid rgba(218,223,233,0.7);font-size:80%;opacity:0.7}:host{display:block}\n  "]
            },] },
];
/** @nocollapse */
ChoosyResultsComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ChoosyConfigService, },
    { type: ChangeDetectorRef, },
]; };
ChoosyResultsComponent.propDecorators = {
    'choosy': [{ type: Output },],
    'config': [{ type: Input },],
    'options': [{ type: Input },],
    'template': [{ type: Input },],
};
//# sourceMappingURL=choosy-results.component.js.map