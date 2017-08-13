import { get } from '@ember/object';
import { merge } from '@ember/polyfills';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute: computeFn(function (params, formatHash = {}) {
    this._super(...arguments);

    if (!params || params && params.length > 3) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 3');
    }

    const moment = get(this, 'moment');
    const { locale, timeZone } = formatHash;
    const [date, referenceTime, formats] = params;
    const clone = Object.create(formatHash);

    delete clone.locale;
    delete clone.timeZone;

    const mergedFormats = merge(clone, formats);

    return this.morphMoment(moment.moment(date), { locale, timeZone }).calendar(referenceTime, mergedFormats);
  })
});
