import Ember from 'ember';
import moment from 'moment';
import computeFn from '../utils/compute-fn';

const runBind = Ember.run.bind;

export default Ember.Helper.extend({
  globalAllowEmpty: false,

  compute: computeFn(function(params, { hidePrefix, interval, locale }) {
    this.clearTimer();

    if (interval) {
      this.timer = setTimeout(runBind(this, this.recompute), parseInt(interval, 10));
    }

    let time = moment(...params);

    if (locale) {
      time = time.locale(locale);
    }

    return time.toNow(hidePrefix);
  }),

  clearTimer() {
    clearTimeout(this.timer);
  },

  destroy() {
    this.clearTimer();
    this._super(...arguments);
  }
});
