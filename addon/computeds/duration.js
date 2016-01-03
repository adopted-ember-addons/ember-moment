import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function durationComputed(params) {
  return moment.duration(...params);
});
