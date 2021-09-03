import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

import date from '../../helpers/date';

module('moment-calendar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('one arg (date)', async function (assert) {
    assert.expect(1);

    this.set('date', date(date(0)));
    await render(hbs`{{moment-calendar date}}`);
    assert.dom(this.element).hasText('12/31/1969');
  });

  test('two args (date, referenceDate)', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      date: momentService.moment('2013-01-01T02:30:26Z'),
      referenceDate: momentService.moment('2013-01-01T12:00:00Z'),
    });

    await render(
      hbs`{{moment-calendar date referenceDate timeZone='America/New_York'}}`
    );
    assert.dom(this.element).hasText('Yesterday at 9:30 PM');
  });

  test('two args (date, referenceDate) with formats', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      date: momentService.moment('2013-01-01T02:30:26Z'),
      referenceDate: momentService.moment('2013-01-01T12:00:00Z'),
      formats: {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY',
      },
    });

    await render(
      hbs`{{moment-calendar date referenceDate formats timeZone='America/New_York'}}`
    );
    assert.dom(this.element).hasText('Yesterday');
  });

  test('can pass individual formats', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      date: momentService.moment('2013-01-01T02:30:26Z'),
      referenceDate: momentService.moment('2013-01-01T12:00:00Z'),
      lastDay: '[Yesterday!]',
    });

    await render(
      hbs`{{moment-calendar date referenceDate lastDay=lastDay timeZone='America/New_York'}}`
    );
    assert.dom(this.element).hasText('Yesterday!');
  });

  test('can use a combination of hash options and positional params', async function (assert) {
    assert.expect(2);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      date: momentService.moment('2013-01-01T02:30:26Z'),
      referenceDate: momentService.moment('2013-01-01T12:00:00Z'),
      formats: {
        sameDay: '[Today!]',
        sameElse: 'DD/MM/YYYY',
      },
    });

    await render(
      hbs`{{moment-calendar date referenceDate formats lastDay='[YESTERDAY]' timeZone='America/New_York'}}`
    );

    assert.equal(
      Object.keys(this.formats).length,
      2,
      'formats object shape does not change'
    );
    assert.dom(this.element).hasText('YESTERDAY');
  });

  test('with es locale', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      date: momentService.moment('2013-01-01T08:30:26Z'),
      referenceDate: momentService.moment('2013-01-01T12:00:00Z'),
    });

    await render(
      hbs`{{moment-calendar date referenceDate locale="es" timeZone='America/New_York'}}`
    );
    assert.dom(this.element).hasText('hoy a las 3:30');
  });

  test('can inline timeZone (Sydney)', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      date: momentService.moment('2013-01-01T08:30:26Z'),
      referenceDate: momentService.moment('2013-01-01T12:00:00Z'),
    });

    await render(
      hbs`{{moment-calendar date referenceDate timeZone='Australia/Sydney'}}`
    );

    assert
      .dom(this.element)
      .hasText('Today at 7:30 PM', 'Australia is 11 hours ahead of UTC');
  });
});
