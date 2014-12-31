import Ember from 'ember';
import date from '../helpers/date';
import moment from 'moment';
import { duration as computedDuration } from 'ember-moment/computed';

module('durationComputed');

var createSubject = function (attrs) {
  return Ember.Object.extend(Ember.$.extend(attrs, {})).create();
};

test('Milliseconds - get', function() {
  var subject = createSubject({
    ms: 5000,
    duration: computedDuration('ms')
  });
  equal(subject.get('duration'), 'a few seconds');
	subject.set('ms', 10800000);
	equal(subject.get('duration'), '3 hours');
});

test('Units - get', function() {
  var subject = createSubject({
    numDays: 4,
    duration: computedDuration('numDays', 'days')
  });
  equal(subject.get('duration'), '4 days');
  subject.set('numDays', 1);
  equal(subject.get('duration'), 'a day');
});
