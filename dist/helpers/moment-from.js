import { c as computeFn } from '../helper-compute-DXymp0II.js';
import BaseHelper from './-base.js';

var momentFrom = BaseHelper.extend({
  compute: computeFn(function ([datetime, ...params], {
    hideAffix,
    locale,
    timeZone
  }) {
    this._super(...arguments);
    const moment = this.moment;
    return this.morphMoment(moment.moment(datetime), {
      locale,
      timeZone
    }).from(...params, hideAffix);
  })
});

export { momentFrom as default };
//# sourceMappingURL=moment-from.js.map
