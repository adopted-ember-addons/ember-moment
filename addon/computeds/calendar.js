import { assign } from '@ember/polyfills';
import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function calendarComputed(
  params,
  formatHash = {}
) {
  if (!params || (params && params.length > 3)) {
    throw new TypeError('ember-moment: Invalid Number of arguments, at most 3');
  }

  const [date, referenceTime, formats] = params;
  const clone = { ...formatHash };
  const mergedFormats = assign(clone, formats);

  return moment(date).calendar(referenceTime, mergedFormats);
});
