import moment from 'moment';
import computeFn from '../utils/compute-fn';
import BaseHelper from './-base';

export default BaseHelper.extend({
  globalOutputFormat: 'LLLL',
  globalAllowEmpty: false,

  compute: computeFn(function(params, { locale }) {
    const length = params.length;

    if (length > 3) {
      throw new TypeError('ember-moment: Invalid Number of arguments, expected at most 3');
    }

    let output;
    const args = [];

    args.push(params[0]);

    if (length === 1) {
      output = this.globalOutputFormat;
    } else if (length === 2) {
      output = params[1];
    } else if (length > 2) {
      args.push(params[2]);
      output = params[1];
    }

    let time = moment(...args);

    locale = locale || this.get('moment.locale');

    if (locale) {
      time = time.locale(locale);
    }

    return time.format(output);
  })
});
