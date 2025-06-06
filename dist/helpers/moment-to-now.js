import { c as computeFn } from '../helper-compute-DXymp0II.js';
import BaseHelper from './-base.js';

var momentToNow = BaseHelper.extend({
  compute: computeFn(function (params, {
    hideAffix,
    locale,
    timeZone
  }) {
    this._super(...arguments);
    const moment = this.moment;
    const hide = hideAffix;
    return this.morphMoment(moment.moment(...params), {
      locale,
      timeZone
    }).toNow(hide);
  })
});

export { momentToNow as default };
//# sourceMappingURL=moment-to-now.js.map
