import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import duration from 'ember-moment/computeds/duration';
import format from 'ember-moment/computeds/format';
import fromNow from 'ember-moment/computeds/from-now';
import locale from 'ember-moment/computeds/locale';
import humanize from 'ember-moment/computeds/humanize';
import momentComputed from 'ember-moment/computeds/moment';

export default Controller.extend({
  moment: service(),
  actions: {
    changeLocale(locale) {
      this.moment.changeLocale(locale);
    },
    changeDefaultFormat(defaultFormat) {
      set(this, 'moment.defaultFormat', defaultFormat);
    },
  },
  emptyDate: null,
  numHours: 822,
  unixTimeStamp: 946684799,
  date: computed(() => new Date()),
  currentTime: computed(() => new Date()),
  inTwelveHours: computed(
    () => new Date(new Date().valueOf() + 12 * 60 * 60 * 1000)
  ),
  lastHour: computed(() => new Date(new Date().valueOf() - 60 * 60 * 1000)),
  usIndependenceDay: computed(() => new Date(1776, 6, 4, 12, 0, 0)),
  computedDate: format(locale(momentComputed('date'), 'moment.locale')),
  computedOneHourAgo: fromNow(
    locale(momentComputed('lastHour'), 'moment.locale')
  ),
  computedNumHours: humanize(
    locale(duration('numHours', 'hours'), 'moment.locale')
  ),
});
