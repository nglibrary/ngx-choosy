/**
 * @nglibrary/ngx-choosy - Selectbox/ dropdown for Angular 4+
 * @version v1.1.0
 * @author Lokesh Rajendran
 * @link https://github.com/nglibrary/ngx-choosy#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("rxjs/add/operator/map"), require("rxjs/add/operator/share"), require("rxjs/BehaviorSubject"), require("rxjs/Subject"), require("@angular/forms"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "rxjs/add/operator/map", "rxjs/add/operator/share", "rxjs/BehaviorSubject", "rxjs/Subject", "@angular/forms"], factory);
	else if(typeof exports === 'object')
		exports["ticktock"] = factory(require("@angular/core"), require("@angular/common"), require("rxjs/add/operator/map"), require("rxjs/add/operator/share"), require("rxjs/BehaviorSubject"), require("rxjs/Subject"), require("@angular/forms"));
	else
		root["ticktock"] = factory(root["ng"]["core"], root["ng"]["common"], root["Rx"], root["Rx"], root["Rx"], root["Rx"], root["ng"]["forms"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_29__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var choosy_list_component_1 = __webpack_require__(11);
exports.ChoosyListComponent = choosy_list_component_1.ChoosyListComponent;
var choosy_results_component_1 = __webpack_require__(5);
exports.ChoosyResultsComponent = choosy_results_component_1.ChoosyResultsComponent;
var choosy_search_component_1 = __webpack_require__(24);
exports.ChoosySearchComponent = choosy_search_component_1.ChoosySearchComponent;
var choosy_footer_component_1 = __webpack_require__(27);
exports.ChoosyFooterComponent = choosy_footer_component_1.ChoosyFooterComponent;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var index$2 = function isMergeableObject(value) {
	return isNonNullObject(value) && isNotSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isNotSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue !== '[object RegExp]'
		&& stringValue !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && index$2(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (index$2(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (index$2(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!index$2(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var index = deepmerge;

module.exports = index;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var merge = __webpack_require__(3);
var GlobalConfigData = (function () {
    function GlobalConfigData() {
    }
    return GlobalConfigData;
}());
exports.GlobalConfigData = GlobalConfigData;
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
                width: 300,
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
ChoosyConfigService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [GlobalConfigData])
], ChoosyConfigService);
exports.ChoosyConfigService = ChoosyConfigService;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var merge = __webpack_require__(3);
var FuseSearch = __webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);
var BehaviorSubject_1 = __webpack_require__(18);
var Subject_1 = __webpack_require__(19);
var choosy_config_service_1 = __webpack_require__(4);
var C = __webpack_require__(6);
var helpers_1 = __webpack_require__(20);
var ChoosyResultsComponent = (function () {
    function ChoosyResultsComponent(elRef, configService, cdRef) {
        this.elRef = elRef;
        this.configService = configService;
        this.cdRef = cdRef;
        this.choosy = new core_1.EventEmitter();
        this.config = {};
        this.originalOptions = [];
        this.processedOptions = [];
        this.selections = new Subject_1.Subject();
        this.isOpen = false;
        this.notifications = new BehaviorSubject_1.BehaviorSubject({ action: 'Initated', value: null });
        this.results = new Subject_1.Subject();
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
            .map(function (option) { return helpers_1.formatRawOption(option); });
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
        options = options.map(function (option) { return helpers_1.formatRawOption(option); });
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
        var newOptions = options.map(function (option) { return helpers_1.formatRawOption(option); });
        this.originalOptions = newOptions;
        this.results.next(this.originalOptions);
        this.notifications.next({ action: C.OPTIONS_RELOADED, value: options });
    };
    ChoosyResultsComponent.prototype.updateConfig = function (config) {
        this.config = merge(this.config, config);
    };
    ChoosyResultsComponent.prototype.resetOptions = function () {
        this.processedOptions = this.originalOptions = this.options
            .map(function (option) { return helpers_1.formatRawOption(option); });
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
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ChoosyResultsComponent.prototype, "choosy", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChoosyResultsComponent.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ChoosyResultsComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], ChoosyResultsComponent.prototype, "template", null);
ChoosyResultsComponent = __decorate([
    core_1.Component({
        selector: 'choosy-results',
        template: __webpack_require__(21),
        styles: [__webpack_require__(22)]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        choosy_config_service_1.ChoosyConfigService,
        core_1.ChangeDetectorRef])
], ChoosyResultsComponent);
exports.ChoosyResultsComponent = ChoosyResultsComponent;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OPTIONS_REFRESHED = 'OPTIONS_REFRESHED';
exports.DROPDOWN_OPENED = 'DROPDOWN_OPENED';
exports.DROPDOWN_CLOSED = 'DROPDOWN_CLOSED';
exports.DROPDOWN_TOGGLED = 'DROPDOWN_TOGGLED';
exports.OPTION_SELECTED = 'OPTION_SELECTED';
exports.OPTION_DISABLED = 'OPTION_DISABLED';
exports.CLEARED_DISABLED_OPTION = 'CLEARED_DISABLED_OPTION';
exports.CLEARED_DISABLED_OPTIONS = 'CLEARED_DISABLED_OPTIONS';
exports.NEW_OPTION_ADDED = 'NEW_OPTION_ADDED';
exports.OPTION_REMOVED = 'OPTION_REMOVED';
exports.OPTION_FILTERED = 'OPTION_FILTERED';
exports.SELECTED_OPTION_CLEARED = 'SELECTED_OPTION_CLEARED';
exports.SELECTED_OPTIONS_CLEARED = 'SELECTED_OPTIONS_CLEARED';
exports.OPTION_CLICKED = 'OPTION_CLICKED';
exports.OPTIONS_RESET = 'OPTIONS_RESET';
exports.OPTIONS_RELOADED = 'OPTIONS_RELOADED';
exports.FOOTER_DEFAULT = 'FOOTER_DEFAULT';
exports.FOOTER_FILTER = 'FOOTER_FILTER';
exports.FOOTER_INITIAL = 'FOOTER_INITIAL';
exports.MSG_NO_OPTIONS = 'No options provided!';
exports.ERR_INVALID_OPTIONS = 'No options provided!';


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var choosy_single_select_directive_1 = __webpack_require__(28);
exports.ChoosySingleSelectDirective = choosy_single_select_directive_1.ChoosySingleSelectDirective;
var choosy_button_select_directive_1 = __webpack_require__(30);
exports.ChoosyButtonSelectDirective = choosy_button_select_directive_1.ChoosyButtonSelectDirective;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ngx_choosy_module_1 = __webpack_require__(9);
exports.NgxChoosyModule = ngx_choosy_module_1.NgxChoosyModule;
var components_1 = __webpack_require__(1);
exports.ChoosySearchComponent = components_1.ChoosySearchComponent;
exports.ChoosyFooterComponent = components_1.ChoosyFooterComponent;
exports.ChoosyListComponent = components_1.ChoosyListComponent;
exports.ChoosyResultsComponent = components_1.ChoosyResultsComponent;
var directives_1 = __webpack_require__(7);
exports.ChoosySingleSelectDirective = directives_1.ChoosySingleSelectDirective;
var choosy_config_service_1 = __webpack_require__(4);
exports.ChoosyConfigService = choosy_config_service_1.ChoosyConfigService;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(10);
var core_1 = __webpack_require__(0);
var components_1 = __webpack_require__(1);
var directives_1 = __webpack_require__(7);
var choosy_config_service_1 = __webpack_require__(4);
function ChoosyConfigLoader(globalConfig) {
    return new choosy_config_service_1.ChoosyConfigService(globalConfig);
}
exports.ChoosyConfigLoader = ChoosyConfigLoader;
var NgxChoosyModule = NgxChoosyModule_1 = (function () {
    function NgxChoosyModule(parentModule) {
        if (parentModule)
            throw new Error('NgxChoosyModule is already loaded. Import it in the Parent only');
    }
    NgxChoosyModule.forRoot = function (globalConfig) {
        return {
            ngModule: NgxChoosyModule_1,
            providers: [
                { provide: ChoosyConfigLoader, useValue: globalConfig }
            ]
        };
    };
    return NgxChoosyModule;
}());
NgxChoosyModule = NgxChoosyModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        entryComponents: [
            components_1.ChoosyResultsComponent
        ],
        declarations: [
            components_1.ChoosySearchComponent,
            components_1.ChoosyListComponent,
            components_1.ChoosyResultsComponent,
            components_1.ChoosyFooterComponent,
            directives_1.ChoosySingleSelectDirective,
            directives_1.ChoosyButtonSelectDirective
        ],
        exports: [
            components_1.ChoosySearchComponent,
            components_1.ChoosyListComponent,
            components_1.ChoosyResultsComponent,
            components_1.ChoosyFooterComponent,
            directives_1.ChoosySingleSelectDirective,
            directives_1.ChoosyButtonSelectDirective
        ],
        providers: [choosy_config_service_1.ChoosyConfigService]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [NgxChoosyModule])
], NgxChoosyModule);
exports.NgxChoosyModule = NgxChoosyModule;
var NgxChoosyModule_1;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ChoosyListComponent = (function () {
    function ChoosyListComponent(elRef, cdRef) {
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.config = {};
        this.optionSelected = new core_1.EventEmitter();
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
        var parentElem = this.elRef.nativeElement.querySelector('.choosy-list-wrapper');
        if (elem && parentElem)
            parentElem.scrollTop = elem.offsetTop;
        this.scrolledToTop = true;
    };
    return ChoosyListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ChoosyListComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChoosyListComponent.prototype, "config", void 0);
__decorate([
    core_1.Input('template'),
    __metadata("design:type", core_1.TemplateRef)
], ChoosyListComponent.prototype, "template", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ChoosyListComponent.prototype, "optionSelected", void 0);
__decorate([
    core_1.ViewChildren('itemHolder', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.QueryList),
    __metadata("design:paramtypes", [core_1.QueryList])
], ChoosyListComponent.prototype, "itemHolders", null);
ChoosyListComponent = __decorate([
    core_1.Component({
        selector: 'choosy-list',
        template: __webpack_require__(12),
        styles: [__webpack_require__(13)]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.ChangeDetectorRef])
], ChoosyListComponent);
exports.ChoosyListComponent = ChoosyListComponent;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<div class=\"choosy-list-wrapper\" [style.maxHeight]=\"config.dropdown.height+'px'\">\n  <div class=\"choosy-list-item\" [ngClass]=\"{\n    'disabled':option.props.disabled ,\n    'selected':option.props.selected\n    }\" *ngFor=\"let option of options\" (click)=\"!option.props.disabled && optionClicked($event,option)\" #itemelem [tabIndex]=\"i+2\">\n    <ng-template #itemHolder></ng-template>\n    <ng-container *ngIf=\"!template\"> {{option.value}}</ng-container>\n  </div>\n</div>\n"

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(14);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ":host() {\n  display: block; }\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Fuse.js v3.0.5 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Fuse", [], factory);
	else if(typeof exports === 'object')
		exports["Fuse"] = factory();
	else
		root["Fuse"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bitapRegexSearch = __webpack_require__(5);
var bitapSearch = __webpack_require__(7);
var patternAlphabet = __webpack_require__(4);

var Bitap = function () {
  function Bitap(pattern, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$isCaseSensitive = _ref.isCaseSensitive,
        isCaseSensitive = _ref$isCaseSensitive === undefined ? false : _ref$isCaseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

    _classCallCheck(this, Bitap);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: isCaseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength
    };

    this.pattern = this.options.isCaseSensitive ? pattern : pattern.toLowerCase();

    if (this.pattern.length <= maxPatternLength) {
      this.patternAlphabet = patternAlphabet(this.pattern);
    }
  }

  _createClass(Bitap, [{
    key: 'search',
    value: function search(text) {
      if (!this.options.isCaseSensitive) {
        text = text.toLowerCase();
      }

      // Exact match
      if (this.pattern === text) {
        return {
          isMatch: true,
          score: 0,
          matchedIndices: [[0, text.length - 1]]
        };
      }

      // When pattern length is greater than the machine word length, just do a a regex comparison
      var _options = this.options,
          maxPatternLength = _options.maxPatternLength,
          tokenSeparator = _options.tokenSeparator;

      if (this.pattern.length > maxPatternLength) {
        return bitapRegexSearch(text, this.pattern, tokenSeparator);
      }

      // Otherwise, use Bitap algorithm
      var _options2 = this.options,
          location = _options2.location,
          distance = _options2.distance,
          threshold = _options2.threshold,
          findAllMatches = _options2.findAllMatches,
          minMatchCharLength = _options2.minMatchCharLength;

      return bitapSearch(text, this.pattern, this.patternAlphabet, {
        location: location,
        distance: distance,
        threshold: threshold,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength
      });
    }
  }]);

  return Bitap;
}();

// let x = new Bitap("od mn war", {})
// let result = x.search("Old Man's War")
// console.log(result)

module.exports = Bitap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(0);

var deepValue = function deepValue(obj, path, list) {
  if (!path) {
    // If there's no path left, we've gotten to the object we care about.
    list.push(obj);
  } else {
    var dotIndex = path.indexOf('.');
    var firstSegment = path;
    var remaining = null;

    if (dotIndex !== -1) {
      firstSegment = path.slice(0, dotIndex);
      remaining = path.slice(dotIndex + 1);
    }

    var value = obj[firstSegment];

    if (value !== null && value !== undefined) {
      if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
        list.push(value);
      } else if (isArray(value)) {
        // Search each item in the array.
        for (var i = 0, len = value.length; i < len; i += 1) {
          deepValue(value[i], remaining, list);
        }
      } else if (remaining) {
        // An object. Recurse further.
        deepValue(value, remaining, list);
      }
    }
  }

  return list;
};

module.exports = function (obj, path) {
  return deepValue(obj, path, []);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var matchedIndices = [];
  var start = -1;
  var end = -1;
  var i = 0;

  for (var len = matchmask.length; i < len; i += 1) {
    var match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        matchedIndices.push([start, end]);
      }
      start = -1;
    }
  }

  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    matchedIndices.push([start, i - 1]);
  }

  return matchedIndices;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern) {
  var mask = {};
  var len = pattern.length;

  for (var i = 0; i < len; i += 1) {
    mask[pattern.charAt(i)] = 0;
  }

  for (var _i = 0; _i < len; _i += 1) {
    mask[pattern.charAt(_i)] |= 1 << len - _i - 1;
  }

  return mask;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

module.exports = function (text, pattern) {
  var tokenSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : / +/g;

  var regex = new RegExp(pattern.replace(SPECIAL_CHARS_REGEX, '\\$&').replace(tokenSeparator, '|'));
  var matches = text.match(regex);
  var isMatch = !!matches;
  var matchedIndices = [];

  if (isMatch) {
    for (var i = 0, matchesLen = matches.length; i < matchesLen; i += 1) {
      var match = matches[i];
      matchedIndices.push([text.indexOf(match), match.length - 1]);
    }
  }

  return {
    // TODO: revisit this score
    score: isMatch ? 0.5 : 1,
    isMatch: isMatch,
    matchedIndices: matchedIndices
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern, _ref) {
  var _ref$errors = _ref.errors,
      errors = _ref$errors === undefined ? 0 : _ref$errors,
      _ref$currentLocation = _ref.currentLocation,
      currentLocation = _ref$currentLocation === undefined ? 0 : _ref$currentLocation,
      _ref$expectedLocation = _ref.expectedLocation,
      expectedLocation = _ref$expectedLocation === undefined ? 0 : _ref$expectedLocation,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance;

  var accuracy = errors / pattern.length;
  var proximity = Math.abs(expectedLocation - currentLocation);

  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy;
  }

  return accuracy + proximity / distance;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bitapScore = __webpack_require__(6);
var matchedIndices = __webpack_require__(3);

module.exports = function (text, pattern, patternAlphabet, _ref) {
  var _ref$location = _ref.location,
      location = _ref$location === undefined ? 0 : _ref$location,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
      _ref$findAllMatches = _ref.findAllMatches,
      findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
      _ref$minMatchCharLeng = _ref.minMatchCharLength,
      minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

  var expectedLocation = location;
  // Set starting location at beginning text and initialize the alphabet.
  var textLen = text.length;
  // Highest score beyond which we give up.
  var currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  var bestLocation = text.indexOf(pattern, expectedLocation);

  var patternLen = pattern.length;

  // a mask of the matches
  var matchMask = [];
  for (var i = 0; i < textLen; i += 1) {
    matchMask[i] = 0;
  }

  if (bestLocation !== -1) {
    var score = bitapScore(pattern, {
      errors: 0,
      currentLocation: bestLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });
    currentThreshold = Math.min(score, currentThreshold);

    // What about in the other direction? (speed up)
    bestLocation = text.lastIndexOf(pattern, expectedLocation + patternLen);

    if (bestLocation !== -1) {
      var _score = bitapScore(pattern, {
        errors: 0,
        currentLocation: bestLocation,
        expectedLocation: expectedLocation,
        distance: distance
      });
      currentThreshold = Math.min(_score, currentThreshold);
    }
  }

  // Reset the best location
  bestLocation = -1;

  var lastBitArr = [];
  var finalScore = 1;
  var binMax = patternLen + textLen;

  var mask = 1 << patternLen - 1;

  for (var _i = 0; _i < patternLen; _i += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    var binMin = 0;
    var binMid = binMax;

    while (binMin < binMid) {
      var _score3 = bitapScore(pattern, {
        errors: _i,
        currentLocation: expectedLocation + binMid,
        expectedLocation: expectedLocation,
        distance: distance
      });

      if (_score3 <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }

      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;

    var start = Math.max(1, expectedLocation - binMid + 1);
    var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;

    // Initialize the bit array
    var bitArr = Array(finish + 2);

    bitArr[finish + 1] = (1 << _i) - 1;

    for (var j = finish; j >= start; j -= 1) {
      var currentLocation = j - 1;
      var charMatch = patternAlphabet[text.charAt(currentLocation)];

      if (charMatch) {
        matchMask[currentLocation] = 1;
      }

      // First pass: exact match
      bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

      // Subsequent passes: fuzzy match
      if (_i !== 0) {
        bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
      }

      if (bitArr[j] & mask) {
        finalScore = bitapScore(pattern, {
          errors: _i,
          currentLocation: currentLocation,
          expectedLocation: expectedLocation,
          distance: distance
        });

        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = currentLocation;

          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expectedLocation) {
            break;
          }

          // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }

    // No hope for a (better) match at greater error levels.
    var _score2 = bitapScore(pattern, {
      errors: _i + 1,
      currentLocation: expectedLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });

    if (_score2 > currentThreshold) {
      break;
    }

    lastBitArr = bitArr;
  }

  // Count exact matches (those with a score of 0) to be "almost" exact
  return {
    isMatch: bestLocation >= 0,
    score: finalScore === 0 ? 0.001 : finalScore,
    matchedIndices: matchedIndices(matchMask, minMatchCharLength)
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bitap = __webpack_require__(1);
var deepValue = __webpack_require__(2);
var isArray = __webpack_require__(0);

var Fuse = function () {
  function Fuse(list, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$caseSensitive = _ref.caseSensitive,
        caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? null : _ref$id,
        _ref$keys = _ref.keys,
        keys = _ref$keys === undefined ? [] : _ref$keys,
        _ref$shouldSort = _ref.shouldSort,
        shouldSort = _ref$shouldSort === undefined ? true : _ref$shouldSort,
        _ref$getFn = _ref.getFn,
        getFn = _ref$getFn === undefined ? deepValue : _ref$getFn,
        _ref$sortFn = _ref.sortFn,
        sortFn = _ref$sortFn === undefined ? function (a, b) {
      return a.score - b.score;
    } : _ref$sortFn,
        _ref$tokenize = _ref.tokenize,
        tokenize = _ref$tokenize === undefined ? false : _ref$tokenize,
        _ref$matchAllTokens = _ref.matchAllTokens,
        matchAllTokens = _ref$matchAllTokens === undefined ? false : _ref$matchAllTokens,
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === undefined ? false : _ref$includeMatches,
        _ref$includeScore = _ref.includeScore,
        includeScore = _ref$includeScore === undefined ? false : _ref$includeScore,
        _ref$verbose = _ref.verbose,
        verbose = _ref$verbose === undefined ? false : _ref$verbose;

    _classCallCheck(this, Fuse);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: caseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength,
      id: id,
      keys: keys,
      includeMatches: includeMatches,
      includeScore: includeScore,
      shouldSort: shouldSort,
      getFn: getFn,
      sortFn: sortFn,
      verbose: verbose,
      tokenize: tokenize,
      matchAllTokens: matchAllTokens
    };

    this.setCollection(list);
  }

  _createClass(Fuse, [{
    key: 'setCollection',
    value: function setCollection(list) {
      this.list = list;
      return list;
    }
  }, {
    key: 'search',
    value: function search(pattern) {
      this._log('---------\nSearch pattern: "' + pattern + '"');

      var _prepareSearchers2 = this._prepareSearchers(pattern),
          tokenSearchers = _prepareSearchers2.tokenSearchers,
          fullSearcher = _prepareSearchers2.fullSearcher;

      var _search2 = this._search(tokenSearchers, fullSearcher),
          weights = _search2.weights,
          results = _search2.results;

      this._computeScore(weights, results);

      if (this.options.shouldSort) {
        this._sort(results);
      }

      return this._format(results);
    }
  }, {
    key: '_prepareSearchers',
    value: function _prepareSearchers() {
      var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var tokenSearchers = [];

      if (this.options.tokenize) {
        // Tokenize on the separator
        var tokens = pattern.split(this.options.tokenSeparator);
        for (var i = 0, len = tokens.length; i < len; i += 1) {
          tokenSearchers.push(new Bitap(tokens[i], this.options));
        }
      }

      var fullSearcher = new Bitap(pattern, this.options);

      return { tokenSearchers: tokenSearchers, fullSearcher: fullSearcher };
    }
  }, {
    key: '_search',
    value: function _search() {
      var tokenSearchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fullSearcher = arguments[1];

      var list = this.list;
      var resultMap = {};
      var results = [];

      // Check the first item in the list, if it's a string, then we assume
      // that every item in the list is also a string, and thus it's a flattened array.
      if (typeof list[0] === 'string') {
        // Iterate over every item
        for (var i = 0, len = list.length; i < len; i += 1) {
          this._analyze({
            key: '',
            value: list[i],
            record: i,
            index: i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }

        return { weights: null, results: results };
      }

      // Otherwise, the first item is an Object (hopefully), and thus the searching
      // is done on the values of the keys of each item.
      var weights = {};
      for (var _i = 0, _len = list.length; _i < _len; _i += 1) {
        var item = list[_i];
        // Iterate over every key
        for (var j = 0, keysLen = this.options.keys.length; j < keysLen; j += 1) {
          var key = this.options.keys[j];
          if (typeof key !== 'string') {
            weights[key.name] = {
              weight: 1 - key.weight || 1
            };
            if (key.weight <= 0 || key.weight > 1) {
              throw new Error('Key weight has to be > 0 and <= 1');
            }
            key = key.name;
          } else {
            weights[key] = {
              weight: 1
            };
          }

          this._analyze({
            key: key,
            value: this.options.getFn(item, key),
            record: item,
            index: _i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }

      return { weights: weights, results: results };
    }
  }, {
    key: '_analyze',
    value: function _analyze(_ref2, _ref3) {
      var key = _ref2.key,
          value = _ref2.value,
          record = _ref2.record,
          index = _ref2.index;
      var _ref3$tokenSearchers = _ref3.tokenSearchers,
          tokenSearchers = _ref3$tokenSearchers === undefined ? [] : _ref3$tokenSearchers,
          _ref3$fullSearcher = _ref3.fullSearcher,
          fullSearcher = _ref3$fullSearcher === undefined ? [] : _ref3$fullSearcher,
          _ref3$resultMap = _ref3.resultMap,
          resultMap = _ref3$resultMap === undefined ? {} : _ref3$resultMap,
          _ref3$results = _ref3.results,
          results = _ref3$results === undefined ? [] : _ref3$results;

      // Check if the texvaluet can be searched
      if (value === undefined || value === null) {
        return;
      }

      var exists = false;
      var averageScore = -1;
      var numTextMatches = 0;

      if (typeof value === 'string') {
        this._log('\nKey: ' + (key === '' ? '-' : key));

        var mainSearchResult = fullSearcher.search(value);
        this._log('Full text: "' + value + '", score: ' + mainSearchResult.score);

        if (this.options.tokenize) {
          var words = value.split(this.options.tokenSeparator);
          var scores = [];

          for (var i = 0; i < tokenSearchers.length; i += 1) {
            var tokenSearcher = tokenSearchers[i];

            this._log('\nPattern: "' + tokenSearcher.pattern + '"');

            // let tokenScores = []
            var hasMatchInText = false;

            for (var j = 0; j < words.length; j += 1) {
              var word = words[j];
              var tokenSearchResult = tokenSearcher.search(word);
              var obj = {};
              if (tokenSearchResult.isMatch) {
                obj[word] = tokenSearchResult.score;
                exists = true;
                hasMatchInText = true;
                scores.push(tokenSearchResult.score);
              } else {
                obj[word] = 1;
                if (!this.options.matchAllTokens) {
                  scores.push(1);
                }
              }
              this._log('Token: "' + word + '", score: ' + obj[word]);
              // tokenScores.push(obj)
            }

            if (hasMatchInText) {
              numTextMatches += 1;
            }
          }

          averageScore = scores[0];
          var scoresLen = scores.length;
          for (var _i2 = 1; _i2 < scoresLen; _i2 += 1) {
            averageScore += scores[_i2];
          }
          averageScore = averageScore / scoresLen;

          this._log('Token score average:', averageScore);
        }

        var finalScore = mainSearchResult.score;
        if (averageScore > -1) {
          finalScore = (finalScore + averageScore) / 2;
        }

        this._log('Score average:', finalScore);

        var checkTextMatches = this.options.tokenize && this.options.matchAllTokens ? numTextMatches >= tokenSearchers.length : true;

        this._log('\nCheck Matches: ' + checkTextMatches);

        // If a match is found, add the item to <rawResults>, including its score
        if ((exists || mainSearchResult.isMatch) && checkTextMatches) {
          // Check if the item already exists in our results
          var existingResult = resultMap[index];

          if (existingResult) {
            // Use the lowest score
            // existingResult.score, bitapResult.score
            existingResult.output.push({
              key: key,
              score: finalScore,
              matchedIndices: mainSearchResult.matchedIndices
            });
          } else {
            // Add it to the raw result list
            resultMap[index] = {
              item: record,
              output: [{
                key: key,
                score: finalScore,
                matchedIndices: mainSearchResult.matchedIndices
              }]
            };

            results.push(resultMap[index]);
          }
        }
      } else if (isArray(value)) {
        for (var _i3 = 0, len = value.length; _i3 < len; _i3 += 1) {
          this._analyze({
            key: key,
            value: value[_i3],
            record: record,
            index: index
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }
    }
  }, {
    key: '_computeScore',
    value: function _computeScore(weights, results) {
      this._log('\n\nComputing score:\n');

      for (var i = 0, len = results.length; i < len; i += 1) {
        var output = results[i].output;
        var scoreLen = output.length;

        var totalScore = 0;
        var bestScore = 1;

        for (var j = 0; j < scoreLen; j += 1) {
          var score = output[j].score;
          var weight = weights ? weights[output[j].key].weight : 1;
          var nScore = score * weight;

          if (weight !== 1) {
            bestScore = Math.min(bestScore, nScore);
          } else {
            output[j].nScore = nScore;
            totalScore += nScore;
          }
        }

        results[i].score = bestScore === 1 ? totalScore / scoreLen : bestScore;

        this._log(results[i]);
      }
    }
  }, {
    key: '_sort',
    value: function _sort(results) {
      this._log('\n\nSorting....');
      results.sort(this.options.sortFn);
    }
  }, {
    key: '_format',
    value: function _format(results) {
      var finalOutput = [];

      this._log('\n\nOutput:\n\n', results);

      var transformers = [];

      if (this.options.includeMatches) {
        transformers.push(function (result, data) {
          var output = result.output;
          data.matches = [];

          for (var i = 0, len = output.length; i < len; i += 1) {
            var item = output[i];
            var obj = {
              indices: item.matchedIndices
            };
            if (item.key) {
              obj.key = item.key;
            }
            data.matches.push(obj);
          }
        });
      }

      if (this.options.includeScore) {
        transformers.push(function (result, data) {
          data.score = result.score;
        });
      }

      for (var i = 0, len = results.length; i < len; i += 1) {
        var result = results[i];

        if (this.options.id) {
          result.item = this.options.getFn(result.item, this.options.id)[0];
        }

        if (!transformers.length) {
          finalOutput.push(result.item);
          continue;
        }

        var data = {
          item: result.item
        };

        for (var j = 0, _len2 = transformers.length; j < _len2; j += 1) {
          transformers[j](result, data);
        }

        finalOutput.push(data);
      }

      return finalOutput;
    }
  }, {
    key: '_log',
    value: function _log() {
      if (this.options.verbose) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }
  }]);

  return Fuse;
}();

module.exports = Fuse;

/***/ })
/******/ ]);
});
//# sourceMappingURL=fuse.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRawOption = function (option) {
    var uid = Math.random().toString(36).substr(2, 6);
    return {
        uid: uid,
        props: {
            disabled: false,
            selected: false,
            hidden: false
        },
        value: (!option || (typeof option == 'object' && Object.keys(option).length == 0)) ? '-' : option
    };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"isOpen\" class=\"{{config.theme}}\" [ngClass]=\"{'jerk':config.dropdown.animation}\">\n  <choosy-search [config]=\"config\" (search)=\"filterOptions($event)\" *ngIf=\"config.search.enable && originalOptions.length>0\"></choosy-search>\n  <choosy-list [config]=\"config\" [options]=\"processedOptions\" (optionSelected)=\"optionSelectionListener($event)\" [template]=\"optionTpl\"></choosy-list>\n  <choosy-footer *ngIf=\"config.footer.enable\" [config]=\"config\" [type]=\"footerType\"></choosy-footer>\n</div>\n"

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(23);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".choosy-jerk-animation, #choosy-frame.jerk, :host > div.jerk {\n  animation-name: jerk;\n  animation-duration: 0.2s;\n  animation-iteration-count: 1;\n  animation-direction: normal;\n  animation-timing-function: cubic-bezier(0.5, 0, 0, 1.25);\n  animation-fill-mode: forwards;\n  animation-delay: 0;\n  transition: opacity 0.15s ease-out; }\n\n@keyframes jerk {\n  0% {\n    transform: scale(0.9) translateY(-21px);\n    opacity: 0; }\n  100% {\n    transform: scale(1) translateY(0);\n    opacity: 1; } }\n\n.scrollbar, :host /deep/ .choosy-list-wrapper {\n  overflow-x: auto;\n  position: relative; }\n  .scrollbar::-webkit-scrollbar, :host /deep/ .choosy-list-wrapper::-webkit-scrollbar {\n    width: 7px; }\n  .scrollbar::-webkit-scrollbar-track, :host /deep/ .choosy-list-wrapper::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 2px #cad8d8; }\n  .scrollbar::-webkit-scrollbar-thumb, :host /deep/ .choosy-list-wrapper::-webkit-scrollbar-thumb {\n    background-color: #dadfe9;\n    outline: 1px solid #2dd80e; }\n  .scrollbar:hover::-webkit-scrollbar, :host /deep/ .choosy-list-wrapper:hover::-webkit-scrollbar {\n    width: 10px; }\n\n#choosy-frame, :host > div {\n  border: 1px solid #dadfe9;\n  border-radius: 3px;\n  background-color: #ffffff;\n  margin-top: 3px;\n  box-shadow: 0px 17px 10px -10px rgba(0, 0, 0, 0.1);\n  padding: 10px;\n  overflow: hidden;\n  position: absolute;\n  width: 100%;\n  z-index: 9;\n  left: 0;\n  top: 100%; }\n\n:host /deep/ .choosy-search-wrapper {\n  display: flex;\n  align-items: center;\n  padding-bottom: 10px; }\n  :host /deep/ .choosy-search-wrapper input.choosy-search-input {\n    border-radius: 3px;\n    border: 1px solid #dadfe9;\n    background: transparent;\n    padding: 5px 8px;\n    flex: 1;\n    font-family: inherit;\n    font-size: inherit;\n    outline: none; }\n\n:host /deep/ .choosy-list-wrapper {\n  overflow-x: auto;\n  position: relative;\n  padding: 0 3px; }\n  :host /deep/ .choosy-list-wrapper .choosy-list-item {\n    padding: 7px 10px;\n    cursor: pointer;\n    text-align: left;\n    border-radius: 3px;\n    outline: none;\n    margin-bottom: 2px; }\n    :host /deep/ .choosy-list-wrapper .choosy-list-item:last-child {\n      margin-bottom: 0; }\n  :host /deep/ .choosy-list-wrapper .choosy-list-item:hover,\n  :host /deep/ .choosy-list-wrapper .choosy-list-item:focus {\n    background: #f6f8fa;\n    outline: none; }\n  :host /deep/ .choosy-list-wrapper .choosy-list-item.selected,\n  :host /deep/ .choosy-list-wrapper .choosy-list-item.selected:hover,\n  :host /deep/ .choosy-list-wrapper .choosy-list-item.selected:focus {\n    background: #00cbe2;\n    color: #fff; }\n\n:host /deep/ .choosy-footer-wrapper {\n  text-align: center;\n  padding-top: 10px;\n  margin-top: 10px;\n  border-top: 1px solid rgba(218, 223, 233, 0.7);\n  font-size: 80%;\n  opacity: 0.7; }\n\n:host {\n  display: block; }\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ChoosySearchComponent = (function () {
    function ChoosySearchComponent(elRef) {
        this.elRef = elRef;
        this.search = new core_1.EventEmitter();
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChoosySearchComponent.prototype, "config", void 0);
__decorate([
    core_1.Output('search'),
    __metadata("design:type", core_1.EventEmitter)
], ChoosySearchComponent.prototype, "search", void 0);
__decorate([
    core_1.ViewChild('inputEl'),
    __metadata("design:type", core_1.ElementRef)
], ChoosySearchComponent.prototype, "inputEl", void 0);
ChoosySearchComponent = __decorate([
    core_1.Component({
        selector: 'choosy-search',
        template: "\n    <div class=\"choosy-search-wrapper\">\n      <input type=\"text\" (input)=\"onChange($event.target.value)\" [placeholder]=\"config?.labels?.searchPlaceholder\" #inputEl class=\"choosy-search-input\">\n      <i></i>\n    </div>\n  ",
        styles: [__webpack_require__(25)]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ChoosySearchComponent);
exports.ChoosySearchComponent = ChoosySearchComponent;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(26);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ":host() {\n  display: block; }\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var C = __webpack_require__(6);
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChoosyFooterComponent.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ChoosyFooterComponent.prototype, "type", void 0);
ChoosyFooterComponent = __decorate([
    core_1.Component({
        selector: 'choosy-footer',
        template: "\n    <div class=\"choosy-footer-wrapper\" *ngIf=\"show\" [ngClass]=\"className\">\n     <div class=\"choosy-footer\">{{message}}</div>\n    </div>\n  ",
        styles: [
            ":host(){\n      display:block;\n    }"
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ChoosyFooterComponent);
exports.ChoosyFooterComponent = ChoosyFooterComponent;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(29);
var components_1 = __webpack_require__(1);
var ChoosySingleSelectDirective = ChoosySingleSelectDirective_1 = (function () {
    function ChoosySingleSelectDirective(eRef, renderer, viewContainerRef, compFacResolver) {
        this.eRef = eRef;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.compFacResolver = compFacResolver;
        this.options = [];
        this.config = {};
        this.choosy = new core_1.EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        var factory = this.compFacResolver.resolveComponentFactory(components_1.ChoosyResultsComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory, 0);
        this.compInstance = this.componentRef.instance;
        ChoosySingleSelectDirective_1.compInstances.push(this.compInstance);
    }
    ChoosySingleSelectDirective.prototype.ngOnInit = function () {
        if (typeof this.options[0] === 'object' && !this.config.displayValue) {
            this.config.displayValue = Object.keys(this.options[0])[0];
        }
        this.eRef.nativeElement.readOnly = true;
        this.compInstance.config = this.config;
        this.compInstance.options = this.options;
    };
    ChoosySingleSelectDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.config.wrapInput ? this.wrapInput() : this.makeParentNodeRelative();
        this.compInstance.template = this.template;
        this.choosy.emit(this.prepareEvents(this.compInstance.expose()));
        this.compInstance.selections.subscribe(function (r) {
            var val = _this.config.displayValue ? r[_this.config.displayValue] : r;
            _this.setValue(val);
            _this.onChange(r);
            _this.compInstance.close();
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
            this.compInstance.reloadOptions(this.options);
        }
        if (change.config)
            this.compInstance.config = change.config.currentValue;
    };
    ChoosySingleSelectDirective.prototype.documentClickEvent = function (event) {
        this.onDocumentClick(event);
    };
    ChoosySingleSelectDirective.prototype.clickEvent = function (event) {
        this.compInstance.toggle();
    };
    ChoosySingleSelectDirective.prototype.prepareEvents = function (componentEvent) {
        return __assign({}, componentEvent, { clear: this.clear.bind(this) });
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
        if (event.target != this.eRef.nativeElement &&
            event.target != this.compInstance.elRef.nativeElement &&
            !this.compInstance.elRef.nativeElement.contains(event.target)) {
            this.close();
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
    ChoosySingleSelectDirective.prototype.isOpen = function () {
        return this.compInstance.isOpened();
    };
    ChoosySingleSelectDirective.prototype.open = function () {
        this.compInstance.open();
    };
    ChoosySingleSelectDirective.prototype.close = function () {
        this.compInstance.close();
    };
    ChoosySingleSelectDirective.prototype.toggle = function () {
        this.compInstance.toggle();
    };
    ChoosySingleSelectDirective.prototype.setValue = function (value) {
        this.renderer.setElementProperty(this.eRef.nativeElement, 'value', value);
    };
    ChoosySingleSelectDirective.prototype.clear = function () {
        this.setValue(null);
        this.onChange(null);
        this.compInstance.clearSelectedOptions();
    };
    return ChoosySingleSelectDirective;
}());
ChoosySingleSelectDirective.compInstances = [];
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ChoosySingleSelectDirective.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChoosySingleSelectDirective.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], ChoosySingleSelectDirective.prototype, "template", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ChoosySingleSelectDirective.prototype, "choosy", void 0);
__decorate([
    core_1.HostListener('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ChoosySingleSelectDirective.prototype, "documentClickEvent", null);
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ChoosySingleSelectDirective.prototype, "clickEvent", null);
__decorate([
    core_1.HostListener('input', ['$event.target.value']),
    __metadata("design:type", Object)
], ChoosySingleSelectDirective.prototype, "onChange", void 0);
__decorate([
    core_1.HostListener('blur', []),
    __metadata("design:type", Object)
], ChoosySingleSelectDirective.prototype, "onTouched", void 0);
ChoosySingleSelectDirective = ChoosySingleSelectDirective_1 = __decorate([
    core_1.Directive({
        selector: 'input[choosySingleSelect]',
        exportAs: 'choosy',
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return ChoosySingleSelectDirective_1; }),
                multi: true
            }]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer,
        core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver])
], ChoosySingleSelectDirective);
exports.ChoosySingleSelectDirective = ChoosySingleSelectDirective;
var ChoosySingleSelectDirective_1;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var merge = __webpack_require__(3);
var choosy_results_component_1 = __webpack_require__(5);
var ChoosyButtonSelectDirective = ChoosyButtonSelectDirective_1 = (function () {
    function ChoosyButtonSelectDirective(eRef, renderer, viewContainerRef, compFacResolver, cdRef) {
        this.eRef = eRef;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.compFacResolver = compFacResolver;
        this.cdRef = cdRef;
        this.options = [];
        this.config = {};
        this.localConfig = {
            search: {
                enable: false
            },
            footer: {
                enable: false
            },
            dropdown: {
                width: 300,
                animation: true
            }
        };
        var factory = this.compFacResolver.resolveComponentFactory(choosy_results_component_1.ChoosyResultsComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory, 0);
        ChoosyButtonSelectDirective_1.compInstances.push(this.componentRef.instance);
    }
    ChoosyButtonSelectDirective.prototype.ngOnInit = function () {
        this.componentRef.instance.config = this.config = merge(this.config, this.localConfig);
        this.componentRef.instance.options = this.options;
    };
    ChoosyButtonSelectDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.wrapInput();
        this.componentRef.instance.template = this.itemTemplate;
        this.componentRef.instance.selections.subscribe(function (r) {
            console.log('selected wo dc', _this.eRef.nativeElement);
            var fooby = _this.viewContainerRef.createEmbeddedView(_this.selectedItemTemplate, {
                $implicit: r
            }, 0);
            console.log('fooby nextSibling o>', fooby.rootNodes[0].nextSibling);
            _this.eRef.nativeElement.innerHTML = '';
            _this.eRef.nativeElement.appendChild(fooby.rootNodes[0].nextSibling);
            // this.cdRef.detectChanges();
            console.log('closing');
            _this.componentRef.instance.close();
        });
    };
    ChoosyButtonSelectDirective.prototype.closeDropdown = function () {
        this.componentRef.instance.close();
    };
    ChoosyButtonSelectDirective.prototype.toggleDropdown = function (event) {
        this.componentRef.instance.toggle();
    };
    ChoosyButtonSelectDirective.prototype.onDocumentClick = function (event) {
        if (!this.componentRef.instance.elRef.nativeElement.contains(event.target)) {
            this.closeDropdown();
        }
    };
    ChoosyButtonSelectDirective.prototype.wrapInput = function () {
        var wrapper = document.createElement('div');
        wrapper.setAttribute('style', 'position: relative;display: inline-block;text-align: left;');
        wrapper.style.width = this.config.dropdown.width + "px";
        this.eRef.nativeElement.parentNode.insertBefore(wrapper, this.eRef.nativeElement);
        wrapper.appendChild(this.eRef.nativeElement);
        wrapper.appendChild(this.componentRef.instance.elRef.nativeElement);
    };
    ChoosyButtonSelectDirective.prototype.clickEvent = function (event) {
        ChoosyButtonSelectDirective_1.compInstances.forEach(function (comp) {
            comp.close(new Event('click'));
        });
        this.toggleDropdown(event);
    };
    ChoosyButtonSelectDirective.prototype.documentClickEvent = function (event) {
        this.onDocumentClick(event);
    };
    return ChoosyButtonSelectDirective;
}());
ChoosyButtonSelectDirective.compInstances = [];
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ChoosyButtonSelectDirective.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChoosyButtonSelectDirective.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], ChoosyButtonSelectDirective.prototype, "itemTemplate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], ChoosyButtonSelectDirective.prototype, "selectedItemTemplate", void 0);
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ChoosyButtonSelectDirective.prototype, "clickEvent", null);
__decorate([
    core_1.HostListener('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ChoosyButtonSelectDirective.prototype, "documentClickEvent", null);
ChoosyButtonSelectDirective = ChoosyButtonSelectDirective_1 = __decorate([
    core_1.Directive({ selector: '[choosyButtonSelect]' }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer,
        core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver,
        core_1.ChangeDetectorRef])
], ChoosyButtonSelectDirective);
exports.ChoosyButtonSelectDirective = ChoosyButtonSelectDirective;
var ChoosyButtonSelectDirective_1;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map