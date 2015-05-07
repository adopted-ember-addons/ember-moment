import Ember from 'ember';
import { momentFormat, momentAgo, momentDuration } from 'ember-moment/computed';

export default Ember.Controller.extend({
  now: new Date(),
  lastHour: new Date(new Date().valueOf() - (60*60*1000)),
  date: new Date(),
  numHours: 822,
  computedDate: momentFormat('date', 'MM/DD/YY hh:mm:ss'),
  computedOneHourAgo: momentAgo('lastHour'),
  computedNumHours: momentDuration('numHours', 'hours'),
  usIndependenceDay: new Date(1776, 6, 4, 12, 0, 0)
});
