import date from './date';
import duration from 'ember-moment/helpers/duration';
import callHelper from '../../helpers/call-helper';

module('DurationHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (ms)', function() {
  equal(callHelper(duration, [86400000, FAKE_HANDLEBARS_CONTEXT]), 'a day');
  equal(callHelper(duration, ['',  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds');
});

test('one arg (object)', function() {
  var object = {
    seconds: 2,
    minutes: 2,
    hours: 2,
    days: 2,
    weeks: 2,
    months: 2,
    years: 2
  };
  equal(callHelper(duration, [object,  FAKE_HANDLEBARS_CONTEXT]), '2 years');
});

test('one arg (string)', function() {
  equal(callHelper(duration, ['23:59:59',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});

test('two args (value, units)', function() {
  equal(callHelper(duration, [1, 'minutes', FAKE_HANDLEBARS_CONTEXT]), 'a minute');
  equal(callHelper(duration, [24, 'hours',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});