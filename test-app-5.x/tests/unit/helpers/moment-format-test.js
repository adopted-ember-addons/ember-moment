import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { helper } from '@ember/component/helper';
import { settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

import date from '../../helpers/date';

module('moment-format', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('one arg (date)', async function (assert) {
    assert.expect(1);

    this.set('date', date(date(0)));
    await render(hbs`{{moment-format this.date}}`);
    assert.dom(this.element).hasText('Wednesday, December 31, 1969 7:00 PM');
  });

  test('updating default format recomputes moment-format', async function (assert) {
    assert.expect(2);

    this.set('date', date(date(0)));
    await render(hbs`{{moment-format this.date}}`);

    const service = this.owner.lookup('service:moment');

    assert.dom(this.element).hasText('Wednesday, December 31, 1969 7:00 PM');

    service.set('defaultFormat', 'DD.MM.YYYY');
    await settled();

    assert.dom(this.element).hasText('31.12.1969');
  });

  test('two args (date, inputFormat)', async function (assert) {
    assert.expect(1);

    this.setProperties({
      format: 'MMMM D, YYYY',
      date: date(Date.parse('2011-10-10T14:48:00-05:00')),
    });

    await render(hbs`{{moment-format this.date this.format}}`);
    assert.dom(this.element).hasText('October 10, 2011');
  });

  test('three args (date, outputFormat, inputFormat)', async function (assert) {
    assert.expect(1);

    this.setProperties({
      inputFormat: 'M/D/YY',
      outputFormat: 'MMMM D, YYYY',
      date: '5/3/10',
    });

    await render(
      hbs`{{moment-format this.date this.outputFormat this.inputFormat}}`,
    );
    assert.dom(this.element).hasText('May 3, 2010');
  });

  test('change date input and change is reflected by bound helper', async function (assert) {
    assert.expect(2);

    const context = EmberObject.create({
      date: date(0),
    });

    this.set('context', context);

    await render(hbs`{{moment-format this.context.date}}`);
    assert.dom(this.element).hasText('Wednesday, December 31, 1969 7:00 PM');

    run(function () {
      context.set('date', date(60 * 60 * 24));
    });

    assert.dom(this.element).hasText('Wednesday, December 31, 1969 7:01 PM');
  });

  test('can inline a locale instead of using global locale', async function (assert) {
    assert.expect(1);
    this.set('date', date(date(0)));

    await render(hbs`{{moment-format this.date 'LLLL' locale='es'}}`);
    assert
      .dom(this.element)
      .hasText('miércoles, 31 de diciembre de 1969 19:00');
  });

  test('can inline timeZone (New York)', async function (assert) {
    assert.expect(1);

    this.set('date', 0);
    await render(
      hbs`{{moment-format this.date 'LLLL' timeZone='America/New_York'}}`,
    );
    assert.dom(this.element).hasText('Wednesday, December 31, 1969 7:00 PM');
  });

  test('can inline timeZone (Los Angeles)', async function (assert) {
    assert.expect(1);

    this.set('date', 0);
    await render(
      hbs`{{moment-format this.date 'LLLL' timeZone='America/Los_Angeles'}}`,
    );
    assert.dom(this.element).hasText('Wednesday, December 31, 1969 4:00 PM');
  });

  test('can be called with null when allow-empty is set to true', async function (assert) {
    assert.expect(1);

    this.set('date', null);
    await render(hbs`{{moment-format null allow-empty=true}}`);
    assert.dom(this.element).hasText('');
  });

  test('can be called using subexpression', async function (assert) {
    assert.expect(1);

    this.owner.register(
      'helper:get-format',
      helper(function () {
        return 'L';
      }),
    );

    this.set('date', date(0));
    await render(hbs`{{moment-format this.date (get-format 'global-format')}}`);
    assert.dom(this.element).hasText('12/31/1969');
  });
});
