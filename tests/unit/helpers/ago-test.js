import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import ago from 'ember-moment/helpers/ago';
import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import date from '../../helpers/date';
import callHelper from '../../helpers/call-helper';
import { runAppend, runDestroy } from '../../helpers/run-append';

const FAKE_HANDLEBARS_CONTEXT = {};
let threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

moduleFor('helper:ago', {
  setup() {
    moment.locale('en');
    this.container.register('view:basic', Ember.View);
  }
});

test('one arg (date)', (assert) => {
  assert.equal(callHelper(ago, [threeDaysAgo, FAKE_HANDLEBARS_CONTEXT]), "3 days ago");
  assert.equal(callHelper(ago, [date(),  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds ago');
});

test('two args (date, inputFormat)', (assert) => {
  assert.equal(callHelper(ago, [threeDaysAgo,  'LLLL', FAKE_HANDLEBARS_CONTEXT]), '3 days ago');
  assert.equal(callHelper(ago, [date(),   'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'a few seconds ago');
});

test('change date input and change is reflected by bound helper', function(assert) {
  let context = Ember.Object.create({
    date: new Date(new Date().valueOf() - (60*60*1000))
  });

  let view = this.container.lookupFactory('view:basic').create({
    template: hbs`{{ago date}}`,
    context: context
  });

  runAppend(view);

  assert.equal(view.$().text(), 'an hour ago');

  Ember.run(function () {
    context.set('date', new Date(new Date().valueOf() - (60*60*2000)));
  });

  assert.equal(view.$().text(), '2 hours ago');

  runDestroy(view);
});
