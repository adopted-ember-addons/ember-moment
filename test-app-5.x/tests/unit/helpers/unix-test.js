import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('unix', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('returns the result of moment.unix', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{moment-format (unix 946684799) 'YYYYMMDD' timeZone='America/Los_Angeles'}}`,
    );
    assert.dom(this.element).hasText('19991231');
  });
});
