import computeFn from '../utils/helper-compute.js';
import BaseHelper from './-base.js';

export default BaseHelper.extend({
  compute: computeFn(function (
    [datetime, ...params],
    { hideAffix, locale, timeZone },
  ) {
    this._super(...arguments);

    const moment = this.moment;

    return this.morphMoment(moment.moment(datetime), { locale, timeZone }).to(
      ...params,
      hideAffix,
    );
  }),
});
