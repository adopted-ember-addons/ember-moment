import emberService__default from '@ember/service';
import Evented from '@ember/object/evented';
import { getOwner } from '@ember/application';
import { momentOrMomentTimezone } from '../index.js';
import { computed, set, setProperties } from '@ember/object';

// eslint-disable-next-line ember/no-classic-classes
var moment = emberService__default.extend(Evented, {
  _timeZone: null,
  locale: null,
  localeOptions: null,
  defaultFormat: null,
  init() {
    this._super();
    this.defaultFormat = this.__config__.outputFormat;
  },
  __config__: computed(function () {
    let config = getOwner(this).factoryFor('config:environment').class || {};
    return config['ember-moment'] || {};
  }).readOnly(),
  timeZone: computed('_timeZone', {
    get() {
      return this._timeZone;
    },
    set(propertyKey, timeZone) {
      if (!momentOrMomentTimezone.tz) {
        /* eslint-disable no-console */
        console.warn('[ember-moment] attempted to set timezone, but moment-timezone is not setup.');
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
    momentOrMomentTimezone.updateLocale(locale, localeOptions);
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
    return momentOrMomentTimezone.isMoment(obj);
  },
  moment() {
    let momentObj = momentOrMomentTimezone(...arguments);
    let {
      locale,
      timeZone
    } = this;
    if (locale && momentObj.locale) {
      momentObj = momentObj.locale(locale);
    }
    if (timeZone && momentObj.tz) {
      momentObj = momentObj.tz(timeZone);
    }
    return momentObj;
  },
  utc() {
    let momentObj = momentOrMomentTimezone.utc(...arguments);
    let {
      locale
    } = this;
    if (locale && momentObj.locale) {
      momentObj = momentObj.locale(locale);
    }
    return momentObj;
  }
});

export { moment as default };
//# sourceMappingURL=moment.js.map
