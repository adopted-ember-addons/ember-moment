import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  globalAllowEmpty: false,

  compute: computeFn(function([ datetime, ...params ], { locale, timeZone }) {
    this._super(...arguments);

    return this.morphMoment(moment(datetime), { locale, timeZone }).from(...params);
  })
});
