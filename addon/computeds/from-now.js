import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function fromNowComputed(params) {
  let maybeHideSuffix;

  if (params.length > 1) {
    maybeHideSuffix = params.pop();
  }

  return moment(...params).fromNow(maybeHideSuffix);
});
