import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ChoosyFooterComponent, ChoosyListComponent, ChoosyResultsComponent, ChoosySearchComponent } from './components';
import { ChoosyButtonSelectDirective, ChoosySingleSelectDirective } from './directives';
import { ChoosyConfigService, ChoosyManagerService } from './services';
export function ChoosyConfigLoader(globalConfig) {
    return new ChoosyConfigService(globalConfig);
}
var NgxChoosyModule = (function () {
    function NgxChoosyModule(parentModule) {
        if (parentModule)
            throw new Error('NgxChoosyModule is already loaded. Import it in the Parent only');
    }
    NgxChoosyModule.forRoot = function (globalConfig) {
        return {
            ngModule: NgxChoosyModule,
            providers: [
                { provide: ChoosyConfigLoader, useValue: globalConfig }
            ]
        };
    };
    return NgxChoosyModule;
}());
export { NgxChoosyModule };
NgxChoosyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                entryComponents: [
                    ChoosyResultsComponent
                ],
                declarations: [
                    ChoosySearchComponent,
                    ChoosyListComponent,
                    ChoosyResultsComponent,
                    ChoosyFooterComponent,
                    ChoosySingleSelectDirective,
                    ChoosyButtonSelectDirective
                ],
                exports: [
                    ChoosySearchComponent,
                    ChoosyListComponent,
                    ChoosyResultsComponent,
                    ChoosyFooterComponent,
                    ChoosySingleSelectDirective,
                    ChoosyButtonSelectDirective
                ],
                providers: [ChoosyConfigService, ChoosyManagerService]
            },] },
];
/** @nocollapse */
NgxChoosyModule.ctorParameters = function () { return [
    { type: NgxChoosyModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
]; };
//# sourceMappingURL=ngx-choosy.module.js.map