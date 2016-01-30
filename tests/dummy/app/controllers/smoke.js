import Ember from 'ember';

export default Ember.Controller.extend({
  currentTime: new Date(),
  usIndependenceDay: new Date(1776, 6, 4, 12, 0, 0)
});
