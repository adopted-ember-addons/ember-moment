import EmberObject from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('is-same', function(hooks) {
  setupRenderingTest(hooks);

  test('one arg (comparisonDate)', async function(assert) {
    assert.expect(1);

    await render(hbs`{{is-same '2011-10-19'}}`);
    assert.equal(this.$().text(), 'false');
  });

  test('one arg with precision (comparisonDate, precision)', async function(assert) {
    assert.expect(1);

    const today = new Date();
    const date = `${today.getFullYear()}-10-19`;
    const context = EmberObject.create({
      date: date
    });
    this.set('context', context);

    await render(hbs`{{is-same context.date precision='year'}}`);
    assert.equal(this.$().text(), 'true');
  });

  test('two args (evaluatedDate, comparisonDate)', async function(assert) {
    assert.expect(1);

    await render(hbs`{{is-same '2010-10-20' '2010-10-20'}}`);
    assert.equal(this.$().text(), 'true');
  });

  test('two args with precision (evaluatedDate, comparisonDate, precision)', async function(assert) {
    assert.expect(1);

    await render(hbs`{{is-same '2010-10-20' '2010-12-19' precision='year'}}`);
    assert.equal(this.$().text(), 'true');
  });

  test('can be called with null when allow-empty is set to true', async function(assert) {
    assert.expect(1);

    this.set('date', null);
    await render(hbs`{{is-same null allow-empty=true}}`);
    assert.equal(this.$().text(), '');
  });
});
