import moment from 'moment';
import computeFn from '../utils/compute-fn';

export default function helperFactory(globalAllowEmpty = false) {
  return computeFn(function(params, hash) {
    let now = moment();
    let time = moment(...params);

    if (hash.locale) {
      time = time.locale(hash.locale);
    }

    if (now.diff(time) < 0) { // time is in the future
      return time.fromNow(hash.hideSuffix);
    } else {
      return time.toNow(hash.hidePrefix);
    }
  }, globalAllowEmpty);
}
