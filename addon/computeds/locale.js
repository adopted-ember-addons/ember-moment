import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function localeComputed([date, locale]) {
  if (!moment.isDuration(date)) {
    date = moment(date);
  }

  return date.locale(locale);
});
