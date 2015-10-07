import Ember from 'ember';
import moment from 'moment';
import computeFn from '../utils/compute-fn';
import BaseHelper from './-base';

const runBind = Ember.run.bind;

export default BaseHelper.extend({
  globalAllowEmpty: false,

  compute: computeFn(function(params, { hideSuffix, interval, locale, timeZone }) {
    this.clearTimer();

    if (interval) {
      this.timer = setTimeout(runBind(this, this.recompute), parseInt(interval, 10));
    }

    let time = this.morphMoment(moment(...params), { locale, timeZone });

    return time.fromNow(hideSuffix);
  }),

  clearTimer() {
    clearTimeout(this.timer);
  },

  destroy() {
    this.clearTimer();
    this._super(...arguments);
  }
});
