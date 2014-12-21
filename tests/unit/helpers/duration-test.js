import date from './date';
import duration from 'ember-moment/helpers/duration';
import callHelper from '../../helpers/call-helper';

module('DurationHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (ms)', function() {
  equal(callHelper(duration, [duration(86400000), FAKE_HANDLEBARS_CONTEXT]), '1 day');
  equal(callHelper(duration, [duration(),  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds');
});
