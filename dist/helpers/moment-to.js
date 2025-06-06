import { c as computeFn } from '../helper-compute-DXymp0II.js';
import BaseHelper from './-base.js';

var momentTo = BaseHelper.extend({
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
    }).to(...params, hideAffix);
  })
});

export { momentTo as default };
//# sourceMappingURL=moment-to.js.map
