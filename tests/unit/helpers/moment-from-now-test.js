import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import { runAppend, runDestroy } from '../../helpers/run-append';

let createView;

moduleFor('helper:moment-from-now', {
  needs: ['helper:ago'],
  setup() {
    const container = this.container;
    const registry =  this.registry || this.container;
    registry.register('view:basic', Ember.View);

    createView = function (opts) {
      return container.lookupFactory('view:basic').create(opts);
    };

    moment.locale('en');
  }
});

test('one arg (date)', function(assert) {
  assert.expect(1);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const context = Ember.Object.create({
    date: threeDaysAgo
  });

  const view = createView({
    template: hbs`{{moment-from-now date}}`,
    context: context
  });

  runAppend(view);
  assert.equal(view.$().text(), '3 days ago');
});

test('two args (date, inputFormat)', function(assert) {
  assert.expect(1);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const view = createView({
    template: hbs`{{moment-from-now date inputFormat}}`,
    context: {
      inputFormat: 'LLLL',
      date: threeDaysAgo
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '3 days ago');
});

test('(DEPRECATED) ago two args (date, inputFormat)', function(assert) {
  assert.expect(1);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const view = createView({
    template: hbs`{{ago date inputFormat}}`,
    context: {
      inputFormat: 'LLLL',
      date: threeDaysAgo
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '3 days ago');
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);
  const context = Ember.Object.create({
    date: new Date(new Date().valueOf() - (60*60*1000))
  });

  const view = createView({
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
  const view = createView({
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
  const view = createView({
    template: hbs`{{moment-from-now date allow-empty=true}}`,
    context: {
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '');
  runDestroy(view);
});
