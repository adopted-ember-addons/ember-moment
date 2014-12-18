import Ember from 'ember';
import moment from 'moment';

var get = Ember.get;
var emberComputed = Ember.computed;

export default function computedDuration(date) {
  var computed, momentArgs;
  return computed = emberComputed(date, function () {
    momentArgs = [get(this, date)];
    
    return moment.duration(this, momentArgs).humanize();
  }).readOnly();
}
