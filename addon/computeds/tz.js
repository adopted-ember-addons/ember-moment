import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function tzComputed([value, tz]) {
  if (moment.isMoment(value)) {
    value = moment(value);
  }

  return value.tz(tz);
});
