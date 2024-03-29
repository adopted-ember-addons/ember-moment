import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute: computeFn(function (
    [datetime, ...params],
    { hideAffix, locale, timeZone }
  ) {
    this._super(...arguments);

    const moment = this.moment;

    return this.morphMoment(moment.moment(datetime), { locale, timeZone }).from(
      ...params,
      hideAffix
    );
  }),
});
