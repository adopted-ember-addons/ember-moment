import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;

export default Ember.Service.extend({
  _locale: null,
  _timeZone: null,

  locale: computed({
    get() {
      return this.get('_locale');
    },
    set(propertyKey, locale) {
      this.set('_locale', locale);
      return locale;
    }
  }),

  timeZone: computed({
    get() {
      return this.get('_timeZone');
    },
    set(propertyKey, timeZone) {
      if (moment.tz) {
        this.set('_timeZone', timeZone);
        return timeZone;
      } else {
        Ember.Logger.warn('[ember-moment] attempted to set timezone, but moment-timezone unavailable.');
      }
    }
  }),

  changeLocale(locale) {
    this.set('locale', locale);
  },

  changeTimeZone(timeZone) {
    this.set('timeZone', timeZone);
  },

  moment() {
    let time = moment(...arguments);
    let locale = this.get('locale');
    let timeZone = this.get('timeZone');

    if (locale) {
      time = time.locale(locale);
    }

    if (timeZone && time.tz) {
      time = time.tz(timeZone);
    }

    return time;
  }
});
