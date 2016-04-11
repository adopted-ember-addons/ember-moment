import Ember from 'ember';
import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

const { observer, isEmpty, get } = Ember;

export default BaseHelper.extend({
  globalAllowEmpty: false,

  defaultFormatDidChange: observer('moment.defaultFormat', function() {
    this.recompute();
  }),

  compute: computeFn(function(params, { locale, timeZone }) {
    this._super(...arguments);

    const { length } = params;

    if (length > 3) {
      throw new TypeError('ember-moment: Invalid Number of arguments, expected at most 4');
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

    return this.morphMoment(moment(...args), { locale, timeZone }).format(...formatArgs);
  })
});
