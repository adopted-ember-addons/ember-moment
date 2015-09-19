import Ember from 'ember';
import date from '../../helpers/date';
import hbs from 'htmlbars-inline-precompile';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import moduleForHelper from '../../helpers/module-for-helper';
import { runAppend, runDestroy } from '../../helpers/run-append';
import { test } from 'ember-qunit';

moduleForHelper('moment-format', {
  needs: ['helper:moment'],
});

test('one arg (date)', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment-format date}}`,
    context: {
      date: date(date(0))
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'Wednesday, December 31, 1969 7:00 PM');
  runDestroy(view);
});

test('two args (date, inputFormat)', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment-format date format}}`,
    context: {
      format: 'MMMM D, YYYY',
      date: date(Date.parse('2011-10-10T14:48:00-05:00'))
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'October 10, 2011');
  runDestroy(view);
});

test('three args (date, outputFormat, inputFormat)', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment-format date outputFormat inputFormat}}`,
    context: {
      inputFormat: 'M/D/YY',
      outputFormat: 'MMMM D, YYYY',
      date: '5/3/10'
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'May 3, 2010');
  runDestroy(view);
});

test('(DEPRECATED) three args (date, outputFormat, inputFormat)', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment date outputFormat inputFormat}}`,
    context: {
      inputFormat: 'M/D/YY',
      outputFormat: 'MMMM D, YYYY',
      date: '5/3/10'
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'May 3, 2010');
  runDestroy(view);
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);
  const context = Ember.Object.create({
    date: date(0)
  });

  const view = this.createView({
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
  const view = this.createView({
    template: hbs`{{moment-format date 'LLLL' locale='es'}}`,
    context: {
      date: date(date(0))
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'Miércoles, 31 de Diciembre de 1969 19:00');
  runDestroy(view);
});

test('can be called with null when allow-empty is set to true', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment-format null allow-empty=true}}`,
    context: {
      date: null
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '');
  runDestroy(view);
});

test('can be called using subexpression', function(assert) {
  assert.expect(1);

  this.registry.register('helper:get-format', makeBoundHelper(function() {
    return 'L';
  }));

  const view = this.createView({
    template: hbs`{{moment-format date (get-format 'global-format')}}`,
    context: {
      date: date(0)
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '12/31/1969');
  runDestroy(view);
});
