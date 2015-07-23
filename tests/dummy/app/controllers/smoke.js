import Ember from 'ember';

export default Ember.Controller.extend({
  now: new Date(),
  usIndependenceDay: new Date(1776, 6, 4, 12, 0, 0)
});
