import Ember from 'ember';
import duration from 'ember-moment/computeds/duration';
import format from 'ember-moment/computeds/format';
import fromNow from 'ember-moment/computeds/from-now';
import locale from 'ember-moment/computeds/locale';
import humanize from 'ember-moment/computeds/humanize';
import momentComputed from 'ember-moment/computeds/moment';

export default Ember.Controller.extend({
  moment: Ember.inject.service(),
  actions: {
    changeLocale(locale) {
      this.get('moment').changeLocale(locale);
    },
    changeDefaultFormat(defaultFormat) {
      this.set('moment.defaultFormat', defaultFormat);
    }
  },
  emptyDate: null,
  now: new Date(),
  lastHour: new Date(new Date().valueOf() - (60*60*1000)),
  date: new Date(),
  numHours: 822,
  computedDate: format(locale(momentComputed('date'), 'moment.locale')),
  computedOneHourAgo: fromNow(locale(momentComputed('lastHour'), 'moment.locale')),
  computedNumHours: humanize(locale(duration('numHours', 'hours'), 'moment.locale')),
  usIndependenceDay: new Date(1776, 6, 4, 12, 0, 0)
});
