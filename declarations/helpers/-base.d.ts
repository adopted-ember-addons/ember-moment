declare const _default: Readonly<typeof Helper> & (new (owner?: import("@ember/-internals/owner").default) => Helper<unknown>) & {
    moment: PropertyDecorator;
    disableInterval: boolean;
    readonly globalAllowEmpty: any;
    supportsGlobalAllowEmpty: boolean;
    localeOrTimeZoneChanged: () => void;
    compute(value: any, { interval }: {
        interval: any;
    }): void;
    morphMoment(time: any, { locale, timeZone }: {
        locale: any;
        timeZone: any;
    }): any;
    clearTimer(): void;
    destroy(...args: any[]): void;
};
export default _default;
import Helper from '@ember/component/helper';
//# sourceMappingURL=-base.d.ts.map