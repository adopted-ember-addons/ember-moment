import Ember from 'ember';
import { moment, ago, duration } from 'ember-moment/computed';

export default Ember.Controller.extend({
  now: new Date(),
  lastHour: new Date(new Date().valueOf() - (60*60*1000)),
  date: new Date(),
  numHours: 822,
  computedDate: moment('date', 'MM/DD/YY hh:mm:ss'),
  computedOneHourAgo: ago('lastHour'),
  computedNumHours: duration('numHours', 'hours'),
  usIndependenceDay: new Date(1776, 6, 4, 12, 0, 0)
});
