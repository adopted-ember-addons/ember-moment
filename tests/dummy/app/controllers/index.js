import Ember from 'ember';
import computedDuration from 'ember-moment/computeds/duration';
import computedMoment from 'ember-moment/computeds/moment';
import computedAgo from 'ember-moment/computeds/ago';

export default Ember.Controller.extend({
  now: new Date(),
  lastHour: new Date(new Date().valueOf() - (60*60*1000)),
  date: new Date(),
  numHours: 822,
  computedDate: computedMoment('date', 'MM/DD/YY hh:mm:ss'),
  computedOneHourAgo: computedAgo('lastHour'),
  computedNumHours: computedDuration('numHours', 'hours'),
  usIndependenceDay: new Date(1776, 6, 4, 12, 0, 0)
});
