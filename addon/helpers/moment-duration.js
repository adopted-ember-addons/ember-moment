import moment from 'moment';

import BaseHelper from './-base';

export default BaseHelper.extend({
  disableInterval: true,

  compute(params, { locale, timeZone }) {
    this._super(...arguments);

    if (!params || params && params.length > 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
    }

    return this.morphMoment(moment.duration(...params), { locale, timeZone }).humanize();
  }
});
