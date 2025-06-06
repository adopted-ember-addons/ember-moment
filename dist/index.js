import { macroCondition, dependencySatisfies, importSync } from '@embroider/macros';

// This is the copy of moment or moment-timezone that ember-moment is using.
//
// Apps shouldn't need to use this, because they should pick one or the other
// and import it directly.
//
// An addon that depends on ember-moment and needs moment-timezone should
// declare a peerDep on moment-timezone and import moment-timezone directly, and
// therefore the addon should not need to use this.
//
// An addon that depends on ember-moment and doesn't care about timezone
// features should declare optional peerDeps on both moment and moment-timezone,
// allowing the app to pick either. In this scenario, the addon may want to use
// this to get convenient access to whichever the app picked.
const momentOrMomentTimezone = (() => {
  if (macroCondition(dependencySatisfies('moment-timezone', '*'))) {
    return importSync('moment-timezone').default;
  } else if (macroCondition(dependencySatisfies('moment', '*'))) {
    return importSync('moment').default;
  } else {
    throw new Error(`ember-moment was unable to detect either moment-timezone or moment. Please add one of those to your app.`);
  }
})();

export { momentOrMomentTimezone };
//# sourceMappingURL=index.js.map
