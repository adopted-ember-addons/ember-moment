import { c as computeFn } from '../helper-compute-DXymp0II.js';
import BaseHelper from './-base.js';

var isBefore = BaseHelper.extend({
  compute: computeFn(function (params, {
    precision,
    locale,
    timeZone
  }) {
    this._super(...arguments);
    const moment = this.moment;
    const {
      length
    } = params;
    const args = [];
    const comparisonArgs = [];
    if (length === 1) {
      comparisonArgs.push(params[0]);
    } else if (length === 2) {
      args.push(params[0]);
      comparisonArgs.push(params[1]);
    }
    return this.morphMoment(moment.moment(...args), {
      locale,
      timeZone
    }).isBefore(...comparisonArgs, precision);
  })
});

export { isBefore as default };
//# sourceMappingURL=is-before.js.map
