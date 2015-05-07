import date from './date';
import momentDuration from 'ember-moment/helpers/duration';
import callHelper from '../../helpers/call-helper';

module('DurationHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (ms)', function() {
  equal(callHelper(momentDuration, [86400000, FAKE_HANDLEBARS_CONTEXT]), 'a day');
  equal(callHelper(momentDuration, ['',  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds');
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
  equal(callHelper(momentDuration, [object,  FAKE_HANDLEBARS_CONTEXT]), '2 years');
});

test('one arg (string)', function() {
  equal(callHelper(momentDuration, ['23:59:59',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});

test('two args (value, units)', function() {
  equal(callHelper(momentDuration, [1, 'minutes', FAKE_HANDLEBARS_CONTEXT]), 'a minute');
  equal(callHelper(momentDuration, [24, 'hours',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});
