import Ember from 'ember';
import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

const { observer } = Ember;
const { bind:runBind } = Ember.run;

export default BaseHelper.extend({
  globalAllowEmpty: false,

  defaultFormatDidChange: observer('moment.defaultFormat', function() {
    this.recompute();
  }),

  compute: computeFn(function(params, { locale, timeZone, interval }) {
    this.clearTimer();

    const length = params.length;

    if (length > 4) {
      throw new TypeError('ember-moment: Invalid Number of arguments, expected at most 4');
    }

    if (interval) {
      this.timer = setTimeout(runBind(this, this.recompute), parseInt(interval, 10));
    }

    let format;
    const args = [];
    
    if(params[0] == 'now') {
      params[0] = new Date();
    }

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
  }),
  clearTimer() {
    clearTimeout(this.timer);
  },
  destroy() {
    this.clearTimer();
    this._super(...arguments);
  }
});
