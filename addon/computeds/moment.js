import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function momentComputed(params) {
  return moment(...params);
});
