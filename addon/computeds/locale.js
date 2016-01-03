import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function localeComputed([value, locale]) {
  if (moment.isMoment(value)) {
    value = moment(value);
  }

  return value.locale(locale);
});
