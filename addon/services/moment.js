import Ember from 'ember';
import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { getOwner } from '@ember/application';
import moment from 'moment';
import { computed, get, set, getProperties, setProperties } from '@ember/object';

// question unresolved https://github.com/ember-cli/ember-rfc176-data/issues/12#issuecomment-318603308
const { Logger: { warn }  } = Ember;

export default Service.extend(Evented, {
  _timeZone: null,

  locale: null,
  localeOptions: {},
  defaultFormat: null,

  __config__: computed(function() {
    let config = getOwner(this).factoryFor('config:environment').class || {};

    return get(config, 'moment') || {};
  }).readOnly(),

  timeZone: computed('_timeZone', {
    get() {
      return get(this, '_timeZone');
    },

    set(propertyKey, timeZone) {
      if (!moment.tz) {
        warn('[ember-moment] attempted to set timezone, but moment-timezone is not setup.');
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
