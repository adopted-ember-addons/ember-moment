import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

import date from '../../helpers/date';

moduleForComponent('moment-calendar', {
  integration: true,
  beforeEach() {
    moment.locale('en');
  }
});

test('one arg (date)', function(assert) {
  assert.expect(1);

  this.set('date', date(date(0)));
  this.render(hbs`{{moment-calendar date}}`);
  assert.equal(this.$().text(), '12/31/1969');
});

test('two args (date, referenceDate)', function(assert) {
  assert.expect(1);

  this.setProperties({
    date: moment('2013-01-01T02:30:26Z'),
    referenceDate: moment('2013-01-01T12:00:00Z')
  });

  this.render(hbs`{{moment-calendar date referenceDate timeZone='America/New_York'}}`);
  assert.equal(this.$().text(), 'Yesterday at 9:30 PM');
});

test('with es locale', function(assert) {
  assert.expect(1);

  this.setProperties({
    date: moment('2013-01-01T08:30:26Z'),
    referenceDate: moment('2013-01-01T12:00:00Z')
  });

  this.render(hbs`{{moment-calendar date referenceDate locale="es" timeZone='America/New_York'}}`);
  assert.equal(this.$().text(), 'hoy a las 3:30');
});

test('can inline timeZone (Sydney)', function(assert) {
  assert.expect(1);

  this.setProperties({
    date: moment('2013-01-01T08:30:26Z'),
    referenceDate: moment('2013-01-01T12:00:00Z'),
  });

  this.render(hbs`{{moment-calendar date referenceDate timeZone='Australia/Sydney'}}`);

  assert.equal(this.$().text(), 'Today at 7:30 PM', 'Australia is 11 hours ahead of UTC');
});
