import { ModuleWithProviders } from '@angular/core';
import { ChoosyConfigService } from './services';
export declare function ChoosyConfigLoader(globalConfig: any): ChoosyConfigService;
export declare class NgxChoosyModule {
    static forRoot(globalConfig: any): ModuleWithProviders;
    constructor(parentModule: NgxChoosyModule);
}
