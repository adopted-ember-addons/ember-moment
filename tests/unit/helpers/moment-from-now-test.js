import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('moment-from-now', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('one arg (date)', async function(assert) {
    assert.expect(1);

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const context = EmberObject.create({
      date: threeDaysAgo
    });

    this.set('context', context);

    await render(hbs`{{moment-from-now context.date}}`);
    assert.equal(this.$().text(), '3 days ago');
  });

  test('one arg (dateA, hideAffix=boolean)', async function(assert) {
    assert.expect(2);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateA: momentService.moment().add(3, 'day'),
    });

    await render(hbs`{{moment-to-now dateA hideAffix=true}}`);
    assert.equal(this.$().text(), '3 days');
    await render(hbs`{{moment-to-now dateA hideAffix=false}}`);
    assert.equal(this.$().text(), '3 days ago');
  });

  test('two args (date, inputFormat)', async function(assert) {
    assert.expect(1);

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    this.setProperties({
      inputFormat: 'LLLL',
      date: threeDaysAgo
    });

    await render(hbs`{{moment-from-now date inputFormat}}`);
    assert.equal(this.$().text(), '3 days ago');
  });

  test('change date input and change is reflected by bound helper', async function(assert) {
    assert.expect(2);

    const momentService = this.owner.lookup('service:moment');
    const context = EmberObject.create({
      date: momentService.moment().subtract(1, 'hour'),
    });

    this.set('context', context);

    await render(hbs`{{moment-from-now context.date}}`);
    assert.equal(this.$().text(), 'an hour ago');

    run(function () {
      context.set('date', momentService.moment().subtract(2, 'hours'));
    });

    assert.equal(this.$().text(), '2 hours ago');
  });

  test('can inline a locale instead of using global locale', async function(assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');

    this.set('date', momentService.moment().subtract(1, 'hour'));
    await render(hbs`{{moment-from-now date locale='es'}}`);
    assert.equal(this.$().text(), 'hace una hora');
  });

  test('can be called with null', async function(assert) {
    assert.expect(1);

    this.set('date', null);
    await render(hbs`{{moment-from-now date allow-empty=true}}`);
    assert.equal(this.$().text(), '');
  });

  test('localize arabic - issue 239', async function(assert) {
    this.set('date', new Date());
    await render(hbs`{{moment-from-now date locale='ar' hideAffix=true}}`);
    assert.equal(this.$().text(), 'ثانية واحدة');
  });
});
