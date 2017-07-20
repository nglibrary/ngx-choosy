import { Injectable, Optional } from '@angular/core';
import * as merge from 'deepmerge';
var GlobalConfigData = (function () {
    function GlobalConfigData() {
    }
    return GlobalConfigData;
}());
export { GlobalConfigData };
var ChoosyConfigService = (function () {
    function ChoosyConfigService(config) {
        this.defaultConfig = {
            _local: {},
            theme: 'default',
            labels: {
                inputPlaceholder: 'Choose',
                searchPlaceholder: 'Search',
                noResultsToDisplay: 'No results found',
                noOptionsToDisplay: 'No Options to display',
                noOptionsProvided: 'No Options provided',
                XRecordsMatches: 'Records matching',
                XRecords: 'Records',
            },
            search: {
                enable: true,
                shouldSort: true,
                threshold: 0.0,
                tokenize: true,
                matchAllTokens: true,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: ['value'],
                autoFocus: true,
                hasClearBtn: true
            },
            dropdown: {
                width: '-',
                height: 200,
                animation: false
            },
            footer: {
                enable: true,
                countSummary: true
            },
            keyboardShortcuts: {
                enable: false
            }
        };
        if (config)
            this.defaultConfig = merge(this.defaultConfig, config);
    }
    ChoosyConfigService.prototype.getConfig = function (config) {
        return merge(this.defaultConfig, config);
    };
    ChoosyConfigService.prototype.getDefaultConfig = function () {
        return this.defaultConfig;
    };
    return ChoosyConfigService;
}());
export { ChoosyConfigService };
ChoosyConfigService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ChoosyConfigService.ctorParameters = function () { return [
    { type: GlobalConfigData, decorators: [{ type: Optional },] },
]; };
//# sourceMappingURL=choosy-config.service.js.map