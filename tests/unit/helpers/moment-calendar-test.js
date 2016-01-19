import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';
import date from '../../helpers/date';
import { runAppend, runDestroy } from '../../helpers/run-append';
import moduleForHelper from '../../helpers/module-for-helper';
import moment from 'moment';

moduleForHelper('moment-calendar', {
  needs: ['service:moment'],
});

test('one arg (date)', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment-calendar date}}`,
    context: {
      date: date(date(0)),
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), '12/31/1969');
  runDestroy(view);
});

test('two args (date, referenceDate)', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment-calendar date referenceDate timeZone='America/New_York'}}`,
    context: {
      date: moment('2013-01-01T02:30:26Z'),
      referenceDate: moment('2013-01-01T12:00:00Z'),
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'Yesterday at 9:30 PM');
  runDestroy(view);
});

test('with es locale', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment-calendar date referenceDate locale="es" timeZone='America/New_York'}}`,
    context: {
      date: moment('2013-01-01T08:30:26Z'),
      referenceDate: moment('2013-01-01T12:00:00Z'),
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'hoy a las 3:30');
  runDestroy(view);
});

test('can inline timeZone (Sydney)', function(assert) {
  assert.expect(1);

  const view = this.createView({
    template: hbs`{{moment-calendar date referenceDate timeZone='Australia/Sydney'}}`,
    context: {
      date: moment('2013-01-01T08:30:26Z'),
      referenceDate: moment('2013-01-01T12:00:00Z'),
    }
  });

  runAppend(view);
  assert.equal(view.$().text(), 'Today at 7:30 PM', 'Australia is 11 hours ahead of UTC');
  runDestroy(view);
});
