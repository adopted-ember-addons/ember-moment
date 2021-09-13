import { run } from '@ember/runloop';
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';

// eslint-disable-next-line ember/no-classic-classes
export default Helper.extend({
  moment: service(),
  disableInterval: false,
  get globalAllowEmpty() {
    return this.moment.__config__.allowEmpty;
  },
  supportsGlobalAllowEmpty: true,
  // eslint-disable-next-line ember/no-observers
  localeOrTimeZoneChanged: observer(
    'moment.locale',
    'moment.timeZone',
    function () {
      this.recompute();
    }
  ),

  compute(value, { interval }) {
    if (this.disableInterval) {
      return;
    }

    this.clearTimer();

    if (interval) {
      /*
       * NOTE: intentionally a setTimeout so tests do not block on it
       * as the run loop queue is never clear so tests will stay locked waiting
       * for queue to clear.
       */
      this.intervalTimer = setTimeout(() => {
        run(() => this.recompute());
      }, parseInt(interval, 10));
    }
  },

  morphMoment(time, { locale, timeZone }) {
    const momentService = this.moment;

    locale = locale || momentService.locale;
    timeZone = timeZone || momentService.timeZone;

    if (locale && time.locale) {
      time = time.locale(locale);
    }

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
  },
});
