import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import momentToNow from 'ember-moment/helpers/moment-to-now';
import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import callHelper from '../../helpers/call-helper';
import { runAppend, runDestroy } from '../../helpers/run-append';

const FAKE_HANDLEBARS_CONTEXT = {};
const subject = momentToNow('LLLL');

moduleFor('helper:moment-to-now', {
  setup() {
    moment.locale('en');
    const registry =  this.registry || this.container;
    registry.register('view:basic', Ember.View);
  }
});

test('one arg (date)', (assert) => {
  assert.expect(1);
  const addThreeDays = new Date();
  addThreeDays.setDate(addThreeDays.getDate() - 3);
  assert.equal(callHelper(subject, [addThreeDays, FAKE_HANDLEBARS_CONTEXT]), 'in 3 days');
});

test('two args (date, inputFormat)', (assert) => {
  assert.expect(1);
  const addThreeDays = new Date();
  addThreeDays.setDate(addThreeDays.getDate() - 3);
  assert.equal(callHelper(subject, [addThreeDays, 'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'in 3 days');
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);

  const context = Ember.Object.create({
    date: new Date(new Date().valueOf() - (60*60*1000))
  });

  const view = this.container.lookupFactory('view:basic').create({
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
  const view = this.container.lookupFactory('view:basic').create({
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
  const view = this.container.lookupFactory('view:basic').create({
    template: hbs`{{moment-to-now date allow-empty=true}}`,
    context: {
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '');
  runDestroy(view);
});
