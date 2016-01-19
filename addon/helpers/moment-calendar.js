import moment from 'moment';

import BaseHelper from './-base';

export default BaseHelper.extend({
  compute(params, { locale, timeZone }) {
    if (!params || params && params.length > 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
    }

    const [date, referenceTime] = params;

    return this.morphMoment(moment(date), { locale, timeZone }).calendar(referenceTime);
  }
});
