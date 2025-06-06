import { c as computeFn } from '../helper-compute-DXymp0II.js';
import BaseHelper from './-base.js';

var momentToDate = BaseHelper.extend({
  compute: computeFn(function (params, {
    hidePrefix,
    locale,
    timeZone
  }) {
    this._super(...arguments);
    const moment = this.moment;
    return this.morphMoment(moment.moment(), {
      locale,
      timeZone
    }).to(...params, hidePrefix);
  })
});

export { momentToDate as default };
//# sourceMappingURL=moment-to-date.js.map
