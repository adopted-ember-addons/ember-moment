import moment from 'moment';
import computed from './-base';

export default computed((params) => {
  let maybeHideSuffix;

  if (params.length > 2) {
    maybeHideSuffix = params.pop();
  }

  return moment(...params).fromNow(maybeHideSuffix);
});
