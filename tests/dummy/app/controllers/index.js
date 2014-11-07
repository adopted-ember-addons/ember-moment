import Ember from 'ember';
import { moment, ago } from 'ember-moment/computed';

export default Ember.Controller.extend({
  now: new Date(),
  lastHour: new Date(new Date().valueOf() - (60*60*1000)),
  date: new Date(),
  computedDate: moment('date', 'MM/DD/YY hh:mm:ss'),
  computedOneHourAgo: ago('lastHour'),
  usIndependenceDay: new Date(1776, 6, 4, 12, 0, 0)
});
