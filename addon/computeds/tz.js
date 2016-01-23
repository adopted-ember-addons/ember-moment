import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function tzComputed([date, tz]) {
  return moment(date).tz(tz);
});
