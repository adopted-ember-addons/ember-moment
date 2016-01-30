import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  globalAllowEmpty: false,

  compute: computeFn(function (params, { locale, timeZone }) {
    this._super(...arguments);

    if (!params || params && params.length > 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
    }

    const [date, referenceTime] = params;

    return this.morphMoment(moment(date), { locale, timeZone }).calendar(referenceTime);
  })
});
