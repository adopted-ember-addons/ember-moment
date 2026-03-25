declare const _default: Readonly<typeof Service> & (new (owner?: import("@ember/-internals/owner").default) => Service) & import("@ember/object/mixin").default & {
    _timeZone: null;
    locale: null;
    localeOptions: null;
    defaultFormat: null;
    init(): void;
    __config__: import("@ember/-internals/metal/lib/decorator").ExtendedMethodDecorator;
    timeZone: import("@ember/-internals/metal/lib/computed").ComputedDecorator;
    setLocale(locale: any): void;
    updateLocale(locale: any, localeOptions?: {}): void;
    changeLocale(locale: any, localeOptions?: {}): void;
    setTimeZone(timeZone: any): void;
    changeTimeZone(timeZone: any): void;
    isMoment(obj: any): any;
    moment(...args: any[]): any;
    utc(...args: any[]): any;
};
export default _default;
import Service from '@ember/service';
//# sourceMappingURL=moment.d.ts.map