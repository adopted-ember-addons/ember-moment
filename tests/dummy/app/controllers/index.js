import Ember from 'ember';
import momentDuration from 'ember-moment/computeds/duration';
import momentFormat from 'ember-moment/computeds/format';
import momentFromNow from 'ember-moment/computeds/from-now';

export default Ember.Controller.extend({
  moment: Ember.inject.service(),
  actions: {
    changeLocale(locale) {
      this.get('moment').changeLocale(locale);
    }
  },
  emptyDate: null,
  now: new Date(),
  lastHour: new Date(new Date().valueOf() - (60*60*1000)),
  date: new Date(),
  numHours: 822,
  computedDate: momentFormat('date'),
  computedOneHourAgo: momentFromNow('lastHour'),
  computedNumHours: momentDuration('numHours', 'hours'),
  usIndependenceDay: new Date(1776, 6, 4, 12, 0, 0)
});
