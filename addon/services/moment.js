import Ember from 'ember';
import moment from 'moment';

const { computed, Logger:logger } = Ember;

export default Ember.Service.extend({
  _timeZone: null,

  locale: null,
  defaultFormat: null,

  timeZone: computed('_timeZone', {
    get() {
      return this.get('_timeZone');
    },

    set(propertyKey, timeZone) {
      if (!moment.tz) {
        logger.warn('[ember-moment] attempted to set timezone, but moment-timezone unavailable.');
        return;
      }

      this.set('_timeZone', timeZone);

      return timeZone;
    }
  }),

  changeLocale(locale) {
    this.set('locale', locale);
  },

  changeTimeZone(timeZone) {
    this.set('timeZone', timeZone);
  },
  
  isMoment(obj) {
    return moment.isMoment(obj);
  },

  moment() {
    let time = moment(...arguments);
    const locale = this.get('locale');
    const timeZone = this.get('timeZone');

    if (locale) {
      time = time.locale(locale);
    }

    if (timeZone && time.tz) {
      time = time.tz(timeZone);
    }

    return time;
  }
});
