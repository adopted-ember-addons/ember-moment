import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  globalAllowEmpty: false,

  compute: computeFn(function(params, { precision, inclusivity, locale, timeZone }) {
    this._super(...arguments);

    const _params = [].concat(params);
    const { length } = params;

    if (length < 2 || length > 3) {
      throw new TypeError('ember-moment: Invalid Number of arguments, expected 2 or 3');
    }

    const args = [];

    if (length > 2) {
      args.push(_params.shift());
    }

    return this.morphMoment(moment(...args), { locale, timeZone }).isBetween(..._params, precision, inclusivity);
  })
});
