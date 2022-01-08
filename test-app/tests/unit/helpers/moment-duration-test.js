import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('moment-duration', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('one arg (ms)', async function (assert) {
    assert.expect(1);

    this.set('date', 86400000);
    await render(hbs`{{moment-duration date}}`);
    assert.dom(this.element).hasText('a day');
  });

  test('one arg (empty string)', async function (assert) {
    assert.expect(1);

    this.set('date', '');
    await render(hbs`{{moment-duration date}}`);
    assert.dom(this.element).hasText('a few seconds');
  });

  test('one arg (object)', async function (assert) {
    assert.expect(1);

    this.set('date', {
      seconds: 2,
      minutes: 2,
      hours: 2,
      days: 2,
      weeks: 2,
      months: 2,
      years: 2,
    });

    await render(hbs`{{moment-duration date}}`);
    assert.dom(this.element).hasText('2 years');
  });

  test('one arg (string)', async function (assert) {
    assert.expect(1);

    this.set('date', '23:59:59');
    await render(hbs`{{moment-duration date}}`);
    assert.dom(this.element).hasText('a day');
  });

  test('two args (value, units) - minute', async function (assert) {
    assert.expect(1);

    this.setProperties({
      unit: 'minutes',
      date: 1,
    });

    await render(hbs`{{moment-duration date unit}}`);

    assert.dom(this.element).hasText('a minute');
  });

  test('two args (value, units) - day', async function (assert) {
    assert.expect(1);

    this.setProperties({
      unit: 'day',
      date: 1,
    });

    await render(hbs`{{moment-duration date unit}}`);
    assert.dom(this.element).hasText('a day');
  });

  test('two args (value, units) - empty value', async function (assert) {
    assert.expect(1);

    this.setProperties({
      unit: 'minutes',
      date: null,
    });

    await render(hbs`{{moment-duration date unit}}`);
    assert.dom(this.element).hasText('a few seconds');
  });

  test('can inline a locale instead of using global locale', async function (assert) {
    assert.expect(1);

    this.set('date', 86400000);
    await render(hbs`{{moment-duration date locale='es'}}`);
    assert.dom(this.element).hasText('un día'); // note: that's not an `i` in día
  });
});
