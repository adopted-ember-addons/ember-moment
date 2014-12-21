import Ember from 'ember';
import moment from 'moment';

var get = Ember.get;
var emberComputed = Ember.computed;

export default function computedDuration(ms) {
  var momentArgs, computed;

  computed = emberComputed(ms, function () {
    momentArgs = [get(this, ms)];
    return moment.duration(this, momentArgs).humanize();
  });

  return computed.property.apply(computed, momentArgs).readOnly();
}
