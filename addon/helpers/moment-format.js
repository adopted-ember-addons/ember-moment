import Ember from 'ember';
import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

const { observer } = Ember;

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

    let format;
    const args = [];

    args.push(params[0]);

    if (length === 1) {
      format = this.get('moment.defaultFormat');
    } else if (length === 2) {
      format = params[1];
    } else if (length > 2) {
      args.push(params[2]);
      format = params[1];
    }

    return this.morphMoment(moment(...args), { locale, timeZone }).format(format);
  })
});
