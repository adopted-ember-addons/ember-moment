import { get } from '@ember/object';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute: computeFn(function([ datetime, ...params ], { locale, timeZone }) {
    this._super(...arguments);

    const moment = get(this, 'moment');

    return this.morphMoment(moment.moment(datetime), { locale, timeZone }).from(...params);
  })
});
