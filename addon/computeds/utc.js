import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function utcComputed(params) {
  return moment.utc(...params);
});
