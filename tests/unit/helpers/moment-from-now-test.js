import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import momentFromNow from 'ember-moment/helpers/moment-from-now';
import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import callHelper from '../../helpers/call-helper';
import { runAppend, runDestroy } from '../../helpers/run-append';

const FAKE_HANDLEBARS_CONTEXT = {};

moduleFor('helper:moment-from-now', {
  setup() {
    moment.locale('en');
    const registry =  this.registry || this.container;
    registry.register('view:basic', Ember.View);
  }
});

test('one arg (date)', (assert) => {
  assert.expect(2);
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  assert.equal(callHelper(momentFromNow, [threeDaysAgo, FAKE_HANDLEBARS_CONTEXT]), '3 days ago');
  assert.equal(callHelper(momentFromNow, [moment(), FAKE_HANDLEBARS_CONTEXT]), 'a few seconds ago');
});

test('two args (date, inputFormat)', (assert) => {
  assert.expect(2);
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  assert.equal(callHelper(momentFromNow, [threeDaysAgo, 'LLLL', FAKE_HANDLEBARS_CONTEXT]), '3 days ago');
  assert.equal(callHelper(momentFromNow, [moment(), 'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'a few seconds ago');
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);
  const context = Ember.Object.create({
    date: new Date(new Date().valueOf() - (60*60*1000))
  });

  const view = this.container.lookupFactory('view:basic').create({
    template: hbs`{{moment-from-now date}}`,
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

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);
  const view = this.container.lookupFactory('view:basic').create({
    template: hbs`{{moment-from-now date locale='es'}}`,
    context: {
      date: new Date(new Date().valueOf() - (60*60*1000))
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'hace una hora');
  runDestroy(view);
});

test('can be called with null', function(assert) {
  assert.expect(1);
  const view = this.container.lookupFactory('view:basic').create({
    template: hbs`{{moment-from-now date allow-empty=true}}`,
    context: {
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '');
  runDestroy(view);
});
