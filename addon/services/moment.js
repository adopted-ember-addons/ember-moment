import Ember from 'ember';
import moment from 'moment';

const { computed, get, set, Logger:logger } = Ember;

export default Ember.Service.extend({
  _timeZone: null,

  locale: null,
  defaultFormat: null,

  timeZone: computed('_timeZone', {
    get() {
      return get(this, '_timeZone');
    },

    set(propertyKey, timeZone) {
      if (!moment.tz) {
        logger.warn('[ember-moment] attempted to set timezone, but moment-timezone unavailable.');
        return;
      }

      set(this, '_timeZone', timeZone);

      return timeZone;
    }
  }),

  changeLocale(locale) {
    set(this, 'locale', locale);
  },

  changeTimeZone(timeZone) {
    set(this, 'timeZone', timeZone);
  },

  isMoment(obj) {
    return moment.isMoment(obj);
  },

  moment() {
    let momentObj = moment(...arguments);
    const locale = get(this, 'locale');
    const timeZone = get(this, 'timeZone');

    if (locale && momentObj.locale) {
      momentObj = momentObj.locale(locale);
    }

    if (timeZone && momentObj.tz) {
      momentObj = momentObj.tz(timeZone);
    }

    return momentObj;
  }
});
