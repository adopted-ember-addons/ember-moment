import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

let now = moment.now;

module('now', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  hooks.afterEach(function() {
    moment.now = now;
    self.moment.now = now;
  });

  test('returns the result of moment.now', async function(assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    const current = momentService.moment('20111031');
    moment.now = () => current;
    await render(hbs`{{moment-format (now) 'YYYYMMDD'}}`);
    assert.equal(this.$().text(), '20111031');
  });

  test('returns the result of self.moment.now', async function(assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    const current = momentService.moment('20011031');
    self.moment.now = () => current;
    await render(hbs`{{moment-format (now) 'YYYYMMDD'}}`);
    assert.equal(this.$().text(), '20011031');
  });
});
