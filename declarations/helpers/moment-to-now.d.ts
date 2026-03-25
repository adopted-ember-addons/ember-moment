declare const _default: Readonly<Readonly<typeof import("@ember/-internals/glimmer/lib/helper").default> & (new (owner?: import("@ember/-internals/owner").default) => import("@ember/-internals/glimmer/lib/helper").default<unknown>) & {
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
}> & (new (owner?: import("@ember/-internals/owner").default) => import("@ember/-internals/glimmer/lib/helper").default<unknown>) & {
    compute: (params: any, hash: any, ...args: any[]) => any;
};
export default _default;
//# sourceMappingURL=moment-to-now.d.ts.map