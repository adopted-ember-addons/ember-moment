import {
  moment
} from 'ember-moment/helpers/moment';

module('MomentHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (date)', function() {
  equal(moment(new Date(0), FAKE_HANDLEBARS_CONTEXT), '1969-12-31T19:00:00-05:00');
  equal(moment(new Date(60*60*24), FAKE_HANDLEBARS_CONTEXT), '1969-12-31T19:01:00-05:00');
});

test('two args (date, inputFormat)', function() {
  equal(moment(new Date(0),  'LLLL', FAKE_HANDLEBARS_CONTEXT), '1969-12-31T19:00:00-05:00');
  equal(moment(new Date(60*60*24), 'LLLL', FAKE_HANDLEBARS_CONTEXT), '1969-12-31T19:01:26-05:00');
});

test('three args (date, inputFormat, outputFormat)', function() {
  equal(moment(new Date(0),  'LLLL', 'LLLL', FAKE_HANDLEBARS_CONTEXT), 'Wednesday, December 31, 1969 7:00 PM');
  equal(moment(new Date(60*60*24), 'LLLL', 'LLLL', FAKE_HANDLEBARS_CONTEXT), 'Wednesday, December 31, 1969 7:01 PM');
});
