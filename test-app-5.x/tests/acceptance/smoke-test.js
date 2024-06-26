import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance: Smoke', function (hooks) {
  setupApplicationTest(hooks);
  test('moment', async function (assert) {
    assert.expect(1);
    await visit('/smoke');
    assert.dom('.moment-independence-day').hasText('Jul 04, 1776');
  });

  test('ago', async function (assert) {
    assert.expect(1);
    await visit('/smoke');

    assert.dom('.ago-now').hasText('a few seconds ago');
  });

  test('duration', async function (assert) {
    assert.expect(1);
    await visit('/smoke');
    assert.dom('.duration-seven-minutes').hasText('7 minutes');
  });
});
