import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import moment from 'ember-moment/helpers/moment';
import date from './date';
import callHelper from '../../helpers/call-helper';
import { initialize } from '../../../initializers/ember-moment';
import { runAppend, runDestroy } from '../../helpers/run-append';

moduleFor('ember-moment@helper:moment', {
  beforeEach() {
    initialize(this.container);
  }
});

let FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (date)', (assert) => {
  assert.equal(callHelper(moment, [date(date(0)), FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
  assert.equal(callHelper(moment, [date(date(60*60*24)), FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:01 PM');
});

test('two args (date, outputFormat)', (assert) => {
  assert.equal(callHelper(moment, [date(date(0)),  'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
  assert.equal(callHelper(moment, [date(date(60*60*24)), 'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:01 PM');
  assert.equal(callHelper(moment, [date(Date.parse('2011-10-10T14:48:00-05:00')), 'MMMM D, YYYY', FAKE_HANDLEBARS_CONTEXT]), 'October 10, 2011');
});

test('three args (date, outputFormat, inputFormat)', (assert) => {
  assert.equal(callHelper(moment, ['October 10, 2011', 'LLLL', 'MMMM D, YYYY', FAKE_HANDLEBARS_CONTEXT]), 'Monday, October 10, 2011 12:00 AM');
  assert.equal(callHelper(moment, ['5/3/10', 'MMMM D, YYYY', 'M/D/YY', FAKE_HANDLEBARS_CONTEXT]), 'May 3, 2010');
  assert.equal(callHelper(moment, [date(date(0)),  'LLLL', 'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
});

test('change date input and change is reflected by bound helper', (assert) => {
  let context = Ember.Object.create({
    date: date(0)
  });

  let view = Ember.View.create({
    template: hbs`{{moment date}}`,
    context:  context
  });

  runAppend(view);

  assert.equal(view.$().text(), 'Wednesday, December 31, 1969 7:00 PM');

  Ember.run(function () {
    context.set('date', date(60*60*24));
  });

  assert.equal(view.$().text(), 'Wednesday, December 31, 1969 7:01 PM');

  runDestroy(view);
});
