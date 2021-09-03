import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

let utc = moment.utc;

module('utc', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  hooks.afterEach(function () {
    moment.utc = utc;
    this.setProperties({
      moment: {
        utc,
      },
    });
  });

  test('returns the result of moment.utc', async function (assert) {
    assert.expect(1);

    const timeStr = '2001-10-31T13:24:56';
    const fmtStr = 'YYYY-MM-DDTHH:mm:ss';
    const momentService = this.owner.lookup('service:moment');
    const current = momentService.utc(timeStr, fmtStr);
    moment.utc = () => current;
    await render(hbs`{{moment-format (utc) 'YYYY-MM-DDTHH:mm:ss'}}`);
    assert.dom(this.element).hasText(timeStr);
  });

  test('returns the result of this.moment.utc', async function (assert) {
    assert.expect(1);

    const timeStr = '2001-10-31T13:24:56';
    const fmtStr = 'YYYY-MM-DDTHH:mm:ss';
    const momentService = this.owner.lookup('service:moment');
    const current = momentService.utc(timeStr, fmtStr);
    this.moment.utc = () => current;
    await render(hbs`{{moment-format (utc) 'YYYY-MM-DDTHH:mm:ss'}}`);
    assert.dom(this.element).hasText(timeStr);
  });

  test('utc of existing moment', async function (assert) {
    assert.expect(2);

    const utcTimeStr = '2001-10-31T13:24:56 +00:00';
    const estTimeStr = '2001-10-31T08:24:56 -05:00';
    const fmtStr = 'YYYY-MM-DDTHH:mm:ss Z';
    const momentService = this.owner.lookup('service:moment');
    const estValue = momentService.moment(estTimeStr, fmtStr);
    this.set('estValue', estValue);
    const utcValue = momentService.utc(utcTimeStr, fmtStr);
    this.set('utcValue', utcValue);
    await render(hbs`{{moment-format (utc estValue) 'YYYY-MM-DDTHH:mm:ss Z'}}`);
    assert.dom(this.element).hasText(utcTimeStr);

    await render(hbs`{{moment-format (utc utcValue) 'YYYY-MM-DDTHH:mm:ss Z'}}`);
    assert.dom(this.element).hasText(utcTimeStr);
  });
});
