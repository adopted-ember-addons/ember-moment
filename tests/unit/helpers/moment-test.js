import Ember from 'ember';
import date from './date';
import moment from 'ember-moment/helpers/moment';
import callHelper from '../../helpers/call-helper';
import { initialize } from '../../../initializers/ember-moment';
import { runAppend, runDestroy } from '../../helpers/run-append';

module('MomentHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (date)', function() {
  equal(callHelper(moment, [date(date(0)), FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
  equal(callHelper(moment, [date(date(60*60*24)), FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:01 PM');
});

test('two args (date, outputFormat)', function() {
  equal(callHelper(moment, [date(date(0)),  'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
  equal(callHelper(moment, [date(date(60*60*24)), 'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:01 PM');
  equal(callHelper(moment, [date(Date.parse('2011-10-10T14:48:00-05:00')), 'MMMM D, YYYY', FAKE_HANDLEBARS_CONTEXT]), 'October 10, 2011');
});

test('three args (date, outputFormat, inputFormat)', function() {
  equal(callHelper(moment, ['October 10, 2011', 'LLLL', 'MMMM D, YYYY', FAKE_HANDLEBARS_CONTEXT]), 'Monday, October 10, 2011 12:00 AM');
  equal(callHelper(moment, ['5/3/10', 'MMMM D, YYYY', 'M/D/YY', FAKE_HANDLEBARS_CONTEXT]), 'May 3, 2010');
  equal(callHelper(moment, [date(date(0)),  'LLLL', 'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
});

test('change date input and change is reflected by bound helper', function() {
  initialize();

  var context = Ember.Object.create({
    date: date(0)
  });

  var view = Ember.View.create({
    template: Ember.HTMLBars.compile('{{moment date}}'),
    context:  context
  });  

  runAppend(view);

  equal(view.$().text(), 'Wednesday, December 31, 1969 7:00 PM');

  Ember.run(function () {
    context.set('date', date(60*60*24));
  });

  equal(view.$().text(), 'Wednesday, December 31, 1969 7:01 PM');

  runDestroy(view);
});
