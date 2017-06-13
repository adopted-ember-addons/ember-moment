import Ember from 'ember';
import moment from 'moment';

const {
  computed,
  get,
  getProperties,
  set,
  setProperties,
  Logger:logger
} = Ember;

export default Ember.Service.extend(Ember.Evented, {
  _timeZone: null,

  locale: null,
  localeOptions: {},
  defaultFormat: null,

  timeZone: computed('_timeZone', {
    get() {
      return get(this, '_timeZone');
    },

    set(propertyKey, timeZone) {
      if (!moment.tz) {
        logger.warn('[ember-moment] attempted to set timezone, but moment-timezone is not setup.');
        return;
      }

      set(this, '_timeZone', timeZone);

      return timeZone;
    }
  }),

  setLocale(locale) {
    this.changeLocale(locale);
  },

  updateLocale(locale, localeOptions = {}) {
    this.changeLocale(locale, localeOptions);
  },

  changeLocale(locale, localeOptions = {}) {
    setProperties(this, {
      locale,
      localeOptions
    });
    moment.updateLocale(locale, localeOptions);
    this.trigger('localeChanged', locale);
  },

  setTimeZone(timeZone) {
    this.changeTimeZone(timeZone);
  },

  changeTimeZone(timeZone) {
    set(this, 'timeZone', timeZone);
    this.trigger('timeZoneChanged', timeZone);
  },

  isMoment(obj) {
    return moment.isMoment(obj);
  },

  moment() {
    let momentObj = moment(...arguments);
    let { locale, timeZone } = getProperties(this, 'locale', 'timeZone');

    if (locale && momentObj.locale) {
      momentObj = momentObj.locale(locale);
    }

    if (timeZone && momentObj.tz) {
      momentObj = momentObj.tz(timeZone);
    }

    return momentObj;
  }
});
