import { c as computeFn } from '../helper-compute-DXymp0II.js';
import BaseHelper from './-base.js';

var momentDiff = BaseHelper.extend({
  compute: computeFn(function (params, {
    precision,
    float,
    locale,
    timeZone
  }) {
    this._super(...arguments);
    if (!params || params && params.length !== 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, must be 2');
    }
    const moment = this.moment;
    const [dateA, dateB] = params;
    return this.morphMoment(moment.moment(dateB), {
      locale,
      timeZone
    }).diff(dateA, precision, float);
  })
});

export { momentDiff as default };
//# sourceMappingURL=moment-diff.js.map
