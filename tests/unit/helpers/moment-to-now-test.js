import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import { runAppend, runDestroy } from '../../helpers/run-append';

let createView;

moduleFor('helper:moment-to-now', {
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
  const addThreeDays = new Date();
  addThreeDays.setDate(addThreeDays.getDate() - 3);

  const view = createView({
    template: hbs`{{moment-to-now date}}`,
    context: {
      date: addThreeDays
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'in 3 days');
  runDestroy(view);
});

test('two args (date, inputFormat)', function(assert) {
  assert.expect(1);
  const addThreeDays = new Date();
  addThreeDays.setDate(addThreeDays.getDate() - 3);

  const view = createView({
    template: hbs`{{moment-to-now date format}}`,
    context: {
      format: 'LLLL',
      date: addThreeDays
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'in 3 days');
  runDestroy(view);
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);

  const context = Ember.Object.create({
    date: new Date(new Date().valueOf() - (60*60*1000))
  });

  const view = createView({
    template: hbs`{{moment-to-now date}}`,
    context: context
  });

  runAppend(view);

  assert.equal(view.$().text(), 'in an hour');

  Ember.run(function () {
    context.set('date', new Date(new Date().valueOf() - (60*60*2000)));
  });

  assert.equal(view.$().text(), 'in 2 hours');

  runDestroy(view);
});

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);
  const view = createView({
    template: hbs`{{moment-to-now date locale='es'}}`,
    context: {
      date: new Date(new Date().valueOf() - (60*60*1000))
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'en una hora');
  runDestroy(view);
});

test('can be called with null', function(assert) {
  assert.expect(1);
  const view = createView({
    template: hbs`{{moment-to-now date allow-empty=true}}`,
    context: {
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '');
  runDestroy(view);
});

test('can be called with null using global config option', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-to-now date}}`,
    context: {
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '');
  runDestroy(view);
});

test('unable to called with null overriding global config option', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-to-now date allow-empty=false}}`,
    context: {
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'Invalid date');
  runDestroy(view);
});
