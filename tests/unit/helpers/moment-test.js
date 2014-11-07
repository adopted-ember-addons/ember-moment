import date from './date';
import {
  moment
} from 'ember-moment/helpers/moment';

module('MomentHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (date)', function() {
  equal(moment(date(new Date(0)), FAKE_HANDLEBARS_CONTEXT), 'Wednesday, December 31, 1969 7:00 PM');
  equal(moment(date(new Date(60*60*24)), FAKE_HANDLEBARS_CONTEXT), 'Wednesday, December 31, 1969 7:01 PM');
});

test('two args (date, outputFormat)', function() {
  equal(moment(date(new Date(0)),  'LLLL', FAKE_HANDLEBARS_CONTEXT), 'Wednesday, December 31, 1969 7:00 PM');
  equal(moment(date(new Date(60*60*24)), 'LLLL', FAKE_HANDLEBARS_CONTEXT), 'Wednesday, December 31, 1969 7:01 PM');
  equal(moment(Date.parse('2011-10-10T14:48:00-05:00'), 'MMMM D, YYYY', FAKE_HANDLEBARS_CONTEXT), 'October 10, 2011');
});

test('three args (date, outputFormat, inputFormat)', function() {
  equal(moment('October 10, 2011', 'LLLL', 'MMMM D, YYYY', FAKE_HANDLEBARS_CONTEXT), 'Monday, October 10, 2011 12:00 AM');
  equal(moment('5/3/10', 'MMMM D, YYYY', 'M/D/YY', FAKE_HANDLEBARS_CONTEXT), 'May 3, 2010');
  equal(moment(date(new Date(0)),  'LLLL', 'LLLL', FAKE_HANDLEBARS_CONTEXT), 'Wednesday, December 31, 1969 7:00 PM');
});
