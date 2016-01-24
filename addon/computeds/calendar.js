import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function calendarComputed(params) {
  if (!params || params && params.length > 2) {
    throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
  }

  const [ date, referenceTime ] = params;

  return moment(date).calendar(referenceTime);
});
