import { c as computeFn } from '../helper-compute-DXymp0II.js';
import BaseHelper from './-base.js';

var momentFromNow = BaseHelper.extend({
  compute: computeFn(function (params, {
    hideAffix,
    locale,
    timeZone
  }) {
    this._super(...arguments);
    const moment = this.moment;
    return this.morphMoment(moment.moment(...params), {
      locale,
      timeZone
    }).fromNow(hideAffix);
  })
});

export { momentFromNow as default };
//# sourceMappingURL=moment-from-now.js.map
