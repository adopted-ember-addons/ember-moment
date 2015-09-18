import moment from 'moment';
import computeFn from '../utils/compute-fn';

export default function helperFactory(globalAllowEmpty = false) {
  return computeFn(function(params, { hidePrefix, locale }) {
    let time = moment(...params);

    if (locale) {
      time = time.locale(locale);
    }

    return time.toNow(hidePrefix);
  }, globalAllowEmpty);
}
