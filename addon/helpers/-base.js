import Ember from 'ember';

const { observer, inject, get, Helper } = Ember;
const { bind:runBind } = Ember.run;

export default Helper.extend({
  moment: inject.service(),
  disableInterval: false,

  localeOrTimeZoneChanged: observer('moment.locale', 'moment.timeZone', function() {
    this.recompute();
  }),

  compute(value, { interval }) {
    if (get(this, 'disableInterval')) { return; }

    this.clearTimer();

    if (interval) {
      this.intervalTimer = setTimeout(runBind(this, this.recompute), parseInt(interval, 10));
    }
  },

  morphMoment(time, { locale, timeZone }) {
    locale = locale || get(this, 'moment.locale');

    if (locale) {
      time = time.locale(locale);
    }

    timeZone = timeZone || get(this, 'moment.timeZone');

    if (timeZone && time.tz) {
      time = time.tz(timeZone);
    }

    return time;
  },

  clearTimer() {
    clearTimeout(this.intervalTimer);
  },

  destroy() {
    this.clearTimer();
    this._super(...arguments);
  }
});
