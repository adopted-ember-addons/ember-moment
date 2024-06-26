import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('moment-subtract', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('one arg subtracts duration', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const duration = { days: 3 };
    this.set('duration', duration);
    const expectedString = momentService
      .moment()
      .subtract(duration)
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-subtract this.duration}}`);
    assert.dom().containsText(expectedString);
  });

  test('two args with number and string', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const number = 3;
    const precision = 'days';
    this.setProperties({
      number,
      precision,
    });
    const expectedString = momentService
      .moment()
      .subtract(number, precision)
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-subtract this.number this.precision}}`);
    assert.dom().containsText(expectedString);
  });

  test('two args with date and duration', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const duration = { days: 3 };
    this.set('duration', duration);
    const expectedString = momentService
      .moment('2016-06-01')
      .subtract(duration)
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-subtract '2016-06-01' this.duration}}`);
    assert.dom().containsText(expectedString);
  });

  test('one arg with precision', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const number = 3;
    this.set('number', number);
    const expectedString = momentService
      .moment()
      .subtract(number, 'days')
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-subtract this.number precision='days'}}`);
    assert.dom().containsText(expectedString);
  });

  test('two args with precision', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const number = 3;
    this.set('number', number);
    const expectedString = momentService
      .moment('2016-06-01')
      .subtract(number, 'days')
      .format('ddd MMM DD YYYY');

    await render(
      hbs`{{moment-subtract '2016-06-01' this.number precision='days'}}`,
    );
    assert.dom().containsText(expectedString);
  });
});
