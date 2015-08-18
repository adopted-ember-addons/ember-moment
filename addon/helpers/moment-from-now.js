import moment from 'moment';
import computeFn from '../utils/compute-fn';

export default function helperFactory(globalAllowEmpty = false) {
  return computeFn(function(params, hash) {
    let time = moment(...params);

    if (hash.locale) {
      time = time.locale(hash.locale);
    }

    return time.fromNow(hash.hideSuffix);
  }, globalAllowEmpty);
}
