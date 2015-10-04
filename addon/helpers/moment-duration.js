import moment from 'moment';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute(params, { locale }) {
    if (!params || params && params.length > 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
    }

    let time = moment.duration(...params);

    locale = locale || this.get('moment.locale');

    if (locale) {
      time = time.locale(locale);
    }

    return time.humanize();
  }
});
