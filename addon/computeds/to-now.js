import moment from 'moment';

import computed from './-base';

export default computed((params) => {
  let maybeHidePrefix;

  if (params.length > 2) {
    maybeHidePrefix = params.pop();
  }

  return moment(...params).toNow(maybeHidePrefix);
});
