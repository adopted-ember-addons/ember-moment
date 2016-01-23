import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function toNowComputed(params) {
  let maybeHidePrefix;

  if (params.length > 1) {
    maybeHidePrefix = params.pop();
  }

  return moment(...params).toNow(maybeHidePrefix);
});
