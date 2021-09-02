import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('moment-diff', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('two args with (dateA, dateB)', async function(assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateA: momentService.moment('2017-01-10'),
      dateB: momentService.moment('2017-01-15')
    });

    await render(hbs `{{moment-diff dateA dateB}}`);
    assert.equal(this.$().text(), '432000000');
  });

  test('two args with a moment and a string (dateMoment, dateString)', async function(assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateMoment: momentService.moment('2017-01-10'),
      dateString: '2017-01-15'
    });

    await render(hbs `{{moment-diff dateMoment dateString}}`);
    assert.equal(this.$().text(), '432000000');
  });

  test('two args with (dateA, dateB) and expect a negative result', async function(assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateA: momentService.moment('2017-01-15'),
      dateB: momentService.moment('2017-01-10')
    });

    await render(hbs `{{moment-diff dateA dateB}}`);
    assert.equal(this.$().text(), '-432000000');
  });

  test('two args with precision (dateA, dateB, precision)', async function(assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateA: new Date(),
      dateB: momentService.moment().add(5, 'day')
    });

    await render(hbs `{{moment-diff dateA dateB precision='day'}}`);
    assert.ok(this.$().text(), '5');
  });

  test('two args with precision and float (dateA, dateB, precision, float)', async function(assert) {
    assert.expect(1);
    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateA: new Date(),
      dateB: momentService.moment().add(6, 'month')
    });

    await render(hbs `{{moment-diff dateA dateB precision='year' float=true}}`);
    assert.ok(this.$().text(), '.5');
  });
});
