import computeFn from '../utils/helper-compute.js';
import BaseHelper from './-base.js';

export default BaseHelper.extend({
  compute: computeFn(function (params, { hideAffix, locale, timeZone }) {
    this._super(...arguments);

    const moment = this.moment;
    const hide = hideAffix;
    return this.morphMoment(moment.moment(...params), {
      locale,
      timeZone,
    }).toNow(hide);
  }),
});
