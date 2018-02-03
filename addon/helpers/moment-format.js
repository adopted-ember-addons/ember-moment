import { isEmpty } from '@ember/utils';
import { get, observer } from '@ember/object';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  defaultFormatDidChange: observer('moment.defaultFormat', function() {
    this.recompute();
  }),

  compute: computeFn(function(params, { locale, timeZone }) {
    this._super(...arguments);

    const moment = get(this, 'moment');
    const { length } = params;

    if (length > 3) {
      throw new TypeError('ember-moment: Invalid number of arguments, expected at most 3');
    }

    const args = [];
    const formatArgs = [];
    const defaultFormat = get(this, 'moment.defaultFormat');

    args.push(params[0]);

    if (length === 1 && !isEmpty(defaultFormat)) {
      formatArgs.push(defaultFormat);
    } else if (length === 2) {
      formatArgs.push(params[1]);
    } else if (length > 2) {
      args.push(params[2]);
      formatArgs.push(params[1]);
    }

    return this.morphMoment(moment.moment(...args), { locale, timeZone }).format(...formatArgs);
  })
});
