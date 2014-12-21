import Ember from 'ember';
import date from '../helpers/date';
import moment from 'moment';
import { duration as computedDuration } from 'ember-moment/computed';

module('momentComputed');

var createSubject = function (attrs) {
  return Ember.Object.extend(Ember.$.extend({
    ms: 5000,
    duration: computedDuration('date')
  }, attrs || {})).create();
};

test('Formatter - get', function() {
  var subject = createSubject();
  equal(subject.get('duration'), 'a few seconds');
});

test('Formatter - get #2', function() {
  var subject = createSubject();
  equal(subject.get('duration'), 'a few seconds');
	subject.set('ms', 10800000);
	equal(subject.get('duration'), '3 hours');
});
