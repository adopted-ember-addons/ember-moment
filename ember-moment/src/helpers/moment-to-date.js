import computeFn from '../utils/helper-compute.js';
import BaseHelper from './-base.js';

export default BaseHelper.extend({
  compute: computeFn(function (params, { hidePrefix, locale, timeZone }) {
    this._super(...arguments);

    const moment = this.moment;

    return this.morphMoment(moment.moment(), { locale, timeZone }).to(
      ...params,
      hidePrefix,
    );
  }),
});
