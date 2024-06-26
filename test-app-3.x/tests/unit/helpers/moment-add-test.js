import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('moment-add', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('one arg adds duration', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const duration = { days: 3 };
    this.set('duration', duration);
    const expectedString = momentService
      .moment()
      .add(duration)
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-add this.duration}}`);
    //assert.ok(this.$().text().match());
    assert.dom(this.element).hasText(new RegExp(expectedString));
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
      .add(number, precision)
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-add this.number this.precision}}`);
    assert.dom(this.element).hasText(new RegExp(expectedString));
  });

  test('two args with date and duration', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const duration = { days: 3 };
    this.set('duration', duration);
    const expectedString = momentService
      .moment('2016-06-01')
      .add(duration)
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-add '2016-06-01' this.duration}}`);
    assert.dom(this.element).hasText(new RegExp(expectedString));
  });

  test('one arg with precision', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const number = 3;
    this.set('number', number);
    const expectedString = momentService
      .moment()
      .add(number, 'days')
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-add this.number precision='days'}}`);
    assert.dom(this.element).hasText(new RegExp(expectedString));
  });

  test('two args with precision', async function (assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    const number = 3;
    this.set('number', number);
    const expectedString = momentService
      .moment('2016-06-01')
      .add(number, 'days')
      .format('ddd MMM DD YYYY');

    await render(hbs`{{moment-add '2016-06-01' this.number precision='days'}}`);
    assert.dom(this.element).hasText(new RegExp(expectedString));
  });
});
