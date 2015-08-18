import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { runAppend, runDestroy } from '../../helpers/run-append';

let createView;

moduleFor('helper:moment-duration', {
  needs: ['helper:duration'],
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

test('one arg (ms)', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-duration date}}`,
    context: {
      date: 86400000
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'a day');
  runDestroy(view);
});

test('one arg (empty string)', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-duration date}}`,
    context: {
      date: ''
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'a few seconds');
  runDestroy(view);
});

test('one arg (object)', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-duration date}}`,
    context: {
      date: {
        seconds: 2,
        minutes: 2,
        hours: 2,
        days: 2,
        weeks: 2,
        months: 2,
        years: 2
      }
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '2 years');
  runDestroy(view);
});

test('one arg (string)', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-duration date}}`,
    context: {
      date: '23:59:59'
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'a day');
  runDestroy(view);
});

test('two args (value, units) - minute', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-duration date unit}}`,
    context: {
      unit: 'minutes',
      date: 1
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'a minute');
  runDestroy(view);
});

test('two args (value, units) - day', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-duration date unit}}`,
    context: {
      unit: 'day',
      date: 1
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'a day');
  runDestroy(view);
});

test('(DEPRECATED) two args (value, units) - day', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{duration date unit}}`,
    context: {
      unit: 'day',
      date: 1
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'a day');
  runDestroy(view);
});

test('two args (value, units) - empty value', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-duration date unit}}`,
    context: {
      unit: 'minutes',
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'a few seconds');
  runDestroy(view);
});

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);

  const view = createView({
    template: hbs`{{moment-duration date locale='es'}}`,
    context: {
      date: 86400000
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'un día'); // note: that's not an `i` in día
  runDestroy(view);
});
