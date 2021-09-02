import moment from 'moment-timezone';

import computedFactory from './-base';

export default computedFactory(function tzComputed([date, tz]) {
  return moment(date).tz(tz);
});
