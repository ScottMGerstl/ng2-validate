export abstract class BaseValidation<ConfigT> {

    public config: ConfigT;
    public abstract getDefaultConfig(): ConfigT;

    constructor(config: ConfigT) {
        if (!config) {
            this.config = this.getDefaultConfig();
        }
        else {
            this.config = config;
            this.resolveConfig(this.config, this.getDefaultConfig());
        }
    }

    protected resolveConfig(preferredConfig: ConfigT, defaultConfig: ConfigT) {
        for (let key in preferredConfig) {
            preferredConfig[key] = this.resolveValue(preferredConfig[key], defaultConfig[key]);
        }
    }

    private resolveValue<T>(preferredValue: T, defaultValue: T) {
        if (preferredValue === undefined) {
            return defaultValue;
        }

        return preferredValue;
    }
}