import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  globalAllowEmpty: false,

  compute: computeFn(function(params, { hideSuffix, locale, timeZone }) {
    this._super(...arguments);

    return this.morphMoment(moment(...params), { locale, timeZone }).fromNow(hideSuffix);
  })
});
