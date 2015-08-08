import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import moment from 'moment';
import durationHelper from 'ember-moment/helpers/moment-duration';
import callHelper from '../../helpers/call-helper';
import hbs from 'htmlbars-inline-precompile';
import { runAppend, runDestroy } from '../../helpers/run-append';

moduleFor('helper:moment-duration', {
  setup() {
    moment.locale('en');
    const registry =  this.registry || this.container;
    registry.register('view:basic', Ember.View);
  }
});

const FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (ms)', (assert) => {
  assert.expect(2);
  assert.equal(callHelper(durationHelper, [86400000, FAKE_HANDLEBARS_CONTEXT]), 'a day');
  assert.equal(callHelper(durationHelper, ['',  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds');
});

test('one arg (object)', (assert) => {
  assert.expect(1);

  const object = {
    seconds: 2,
    minutes: 2,
    hours: 2,
    days: 2,
    weeks: 2,
    months: 2,
    years: 2
  };
  assert.equal(callHelper(durationHelper, [object,  FAKE_HANDLEBARS_CONTEXT]), '2 years');
});

test('one arg (string)', (assert) => {
  assert.expect(1);
  assert.equal(callHelper(durationHelper, ['23:59:59',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});

test('two args (value, units)', (assert) => {
  assert.expect(2);
  assert.equal(callHelper(durationHelper, [1, 'minutes', FAKE_HANDLEBARS_CONTEXT]), 'a minute');
  assert.equal(callHelper(durationHelper, [24, 'hours',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});

test('can be called with null', (assert) => {
  assert.expect(1);
  assert.equal(callHelper(durationHelper, [null, 'minutes', FAKE_HANDLEBARS_CONTEXT]), 'a few seconds');
});

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);

  const view = this.container.lookupFactory('view:basic').create({
    template: hbs`{{moment-duration date locale='es'}}`,
    context: {
      date: 86400000
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'un día'); // note: that's not an `i` in día
  runDestroy(view);
});
