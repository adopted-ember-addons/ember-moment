import Ember from 'ember';
import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import momentFormatHelper from 'ember-moment/helpers/moment-format';
import { moduleFor, test } from 'ember-qunit';
import date from '../../helpers/date';
import callHelper from '../../helpers/call-helper';
import { runAppend, runDestroy } from '../../helpers/run-append';

const FAKE_HANDLEBARS_CONTEXT = {};
const subject = momentFormatHelper('LLLL');

moduleFor('helper:moment-format', {
  setup() {
    moment.locale('en');
    this.container.register('view:basic', Ember.View);
  }
});

test('one arg (date)', (assert) => {
  assert.expect(2);
  assert.equal(callHelper(subject, [date(date(0)), FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
  assert.equal(callHelper(subject, [date(date(60*60*24)), FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:01 PM');
});

test('two args (date, outputFormat)', (assert) => {
  assert.expect(3);
  assert.equal(callHelper(subject, [date(date(0)),  'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
  assert.equal(callHelper(subject, [date(date(60*60*24)), 'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:01 PM');
  assert.equal(callHelper(subject, [date(Date.parse('2011-10-10T14:48:00-05:00')), 'MMMM D, YYYY', FAKE_HANDLEBARS_CONTEXT]), 'October 10, 2011');
});

test('three args (date, outputFormat, inputFormat)', (assert) => {
  assert.expect(3);
  assert.equal(callHelper(subject, ['October 10, 2011', 'LLLL', 'MMMM D, YYYY', FAKE_HANDLEBARS_CONTEXT]), 'Monday, October 10, 2011 12:00 AM');
  assert.equal(callHelper(subject, ['5/3/10', 'MMMM D, YYYY', 'M/D/YY', FAKE_HANDLEBARS_CONTEXT]), 'May 3, 2010');
  assert.equal(callHelper(subject, [date(date(0)),  'LLLL', 'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'Wednesday, December 31, 1969 7:00 PM');
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);
  const context = Ember.Object.create({
    date: date(0)
  });

  const view = this.container.lookupFactory('view:basic').create({
    template: hbs`{{moment-format date}}`,
    context: context
  });

  runAppend(view);

  assert.equal(view.$().text(), 'Wednesday, December 31, 1969 7:00 PM');

  Ember.run(function () {
    context.set('date', date(60*60*24));
  });

  assert.equal(view.$().text(), 'Wednesday, December 31, 1969 7:01 PM');

  runDestroy(view);
});

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);
  const view = this.container.lookupFactory('view:basic').create({
    template: hbs`{{moment-format date 'LLLL' locale='es'}}`,
    context: {
      date: date(date(0))
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'Miércoles, 31 de Diciembre de 1969 19:00');
  runDestroy(view);
});
