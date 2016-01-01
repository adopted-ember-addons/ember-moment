import Ember from 'ember';
import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

const { bind:runBind } = Ember.run;

export default BaseHelper.extend({
  globalAllowEmpty: false,

  compute: computeFn(function(params, { hidePrefix, interval, locale, timeZone }) {
    this.clearTimer();

    if (interval) {
      this.timer = setTimeout(runBind(this, this.recompute), parseInt(interval, 10));
    }

    return this.morphMoment(moment(...params), { locale, timeZone }).toNow(hidePrefix);
  }),

  clearTimer() {
    clearTimeout(this.timer);
  },

  destroy() {
    this.clearTimer();
    this._super(...arguments);
  }
});
