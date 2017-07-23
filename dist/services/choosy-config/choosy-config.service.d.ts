import { ChoosyConfig } from '../../interfaces';
export declare class GlobalConfigData {
}
export declare class ChoosyConfigService {
    private defaultConfig;
    constructor(config?: GlobalConfigData);
    getConfig(config: ChoosyConfig): ChoosyConfig;
    getDefaultConfig(): ChoosyConfig;
}
