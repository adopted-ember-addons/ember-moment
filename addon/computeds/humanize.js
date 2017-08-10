import moment from 'moment';

import computedFactory from './-base';

export default computedFactory(function humanizeComputed([duration, suffixless]) {
  if (!moment.isDuration(duration)) {
    duration = moment.duration(duration);
  }

  return duration.humanize(suffixless);
});
