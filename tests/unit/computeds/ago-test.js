import Ember from 'ember';
import date from '../helpers/date';
import moment from 'moment';
import { ago as computedAgo } from 'ember-moment/computed';

module('agoComputed');

var createSubject = function (attrs) {
  return Ember.Object.extend(Ember.$.extend({
    date: new Date(new Date().valueOf() - (60*60*1000)),
    ago: computedAgo('date')
  }, attrs || {})).create();
};

test('Formatter - get', function() {
  var subject = createSubject();
  equal(subject.get('ago'), 'an hour ago');
});

test('Formatter - get #2', function() {
  var subject = createSubject();
  equal(subject.get('ago'), 'an hour ago');
	subject.set('date', new Date(new Date().valueOf() - (60*60*2000)));
	equal(subject.get('ago'), '2 hours ago');
});
