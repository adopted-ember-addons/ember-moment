import Ember from 'ember';

const { observer, inject, get, Helper, run } = Ember;

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
      this.intervalTimer = run.later(this, 'recompute', parseInt(interval, 10));
    }
  },

  morphMoment(time, { locale, timeZone }) {
    const momentService = get(this, 'moment');

    locale = locale || get(momentService, 'locale');
    timeZone = timeZone || get(momentService, 'timeZone');

    if (locale && time.locale) {
      time = time.locale(locale);
    }

    if (timeZone && time.tz) {
      time = time.tz(timeZone);
    }

    return time;
  },

  clearTimer() {
    run.cancel(this.intervalTimer);
  },

  destroy() {
    this.clearTimer();
    this._super(...arguments);
  }
});
