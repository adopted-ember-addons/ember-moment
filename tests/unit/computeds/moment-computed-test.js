import Ember from 'ember';
import date from '../helpers/date';
import { moment as computedMoment } from 'ember-moment/computed';

module('momentComputed');

var alias = Ember.computed.alias;

var createSubject = function (attrs) {
  return Ember.Object.extend(Ember.$.extend({
    date: date(0),
    shortDate: computedMoment('date', 'MM/DD')
  }, attrs || {})).create();
};

test('Formatter - get', function() {
  var subject = createSubject();
  equal(subject.get('shortDate'), '12/31');
});

test('Date - set', function() {
  var subject = createSubject();
  subject.set('date', date('2013-02-08T09:30:26'));
  equal(subject.get('shortDate'), '02/08');
});

test('Formatter - invalid date', function() {
  var subject = createSubject({ date: 'ZZZZZ' });
  equal(subject.get('shortDate'), 'Invalid date');
});

test('Formatter - is computed handled', function() {
  var subject = createSubject({
    _format: 'MM/DD',
    format: alias('_format'),
    shortDate: computedMoment('date', 'format')
  });

  equal(subject.get('shortDate'), '12/31');
  subject.set('_format', 'MM');
  equal(subject.get('shortDate'), '12');
});

test('Observers trigger on date change', function() {
  var observeFired = false;

  var subject = createSubject({
    _format: 'MM/DD',
    format: alias('_format'),
    shortDate: computedMoment('date', 'format'),
    shortDateChanged: function () {
      observeFired = true;
    }.observes('shortDate')
  });

  equal(subject.get('shortDate'), '12/31');
  subject.set('_format', 'MM');
  equal(observeFired, true);
});

test('Observers trigger on date change', function() {
  var observeFired = false;

  var subject = createSubject({
    shortDateChanged: function () {
      observeFired = true;
    }.observes('shortDate')
  });

  equal(subject.get('shortDate'), '12/31');

  subject.set('date', date('2013-02-08T09:30:26'));

  equal(subject.get('shortDate'), '02/08');

  equal(observeFired, true);
});
