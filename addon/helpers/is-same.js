import { get } from '@ember/object';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute: computeFn(function(params, { precision, locale, timeZone }) {
    this._super(...arguments);

    const moment = get(this, 'moment');
    const { length } = params;
    const args = [];
    const comparisonArgs = [];

    if (length === 1) {
      comparisonArgs.push(params[0]);
    } else if (length === 2) {
      args.push(params[0]);
      comparisonArgs.push(params[1]);
    }

    return this.morphMoment(moment.moment(...args), { locale, timeZone }).isSame(...comparisonArgs, precision);
  })
});
