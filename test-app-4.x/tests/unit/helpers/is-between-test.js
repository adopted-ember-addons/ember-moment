import EmberObject from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('is-between', function (hooks) {
  setupRenderingTest(hooks);

  test('two args (comparisonDate1, comparisonDate2)', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    const today = momentService.moment();
    const threeDaysFromNow = today.add(3, 'days');
    const context = EmberObject.create({
      date: threeDaysFromNow,
    });
    this.set('context', context);

    await render(hbs`{{is-between '2010-10-19' this.context.date}}`);
    assert.dom(this.element).hasText('true');
  });

  test('two args (comparisonDate1, comparisonDate2, precision)', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    const today = momentService.moment();
    const threeYearsFromNow = today.add(3, 'years');
    const context = EmberObject.create({
      date: threeYearsFromNow,
    });
    this.set('context', context);

    await render(
      hbs`{{is-between '2010-10-19' this.context.date precision='year'}}`,
    );
    assert.dom(this.element).hasText('true');
  });

  test('two args (comparisonDate1, comparisonDate2, precision, inclusivity)', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    const today = momentService.moment();
    const threeDaysFromNow = today.add(3, 'days');
    const context = EmberObject.create({
      date: threeDaysFromNow,
    });
    this.set('context', context);

    await render(
      hbs`{{is-between '2010-10-19' this.context.date precision='year' inclusivity='()'}}`,
    );
    assert.dom(this.element).hasText('false');
  });

  test('three args (evaluatedDate, comparisonDate1, comparisonDate2)', async function (assert) {
    assert.expect(1);

    await render(hbs`{{is-between '2010-10-20' '2010-10-19' '2010-10-25'}}`);
    assert.dom(this.element).hasText('true');
  });

  test('three args with precision (evaluatedDate, comparisonDate1, comparisonDate2, precision)', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{is-between '2010-10-20' '2009-12-31' '2012-01-01' precision='year'}}`,
    );
    assert.dom(this.element).hasText('true');
  });

  test('three args with inclusivity (evaluatedDate, comparisonDate1, comparisonDate2, inclusivity)', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{is-between '2016-10-30' '2016-10-30' '2016-12-30' inclusivity='[)'}}`,
    );
    assert.dom(this.element).hasText('true');
  });

  test('three args with precision and inclusivity (evaluatedDate, comparisonDate1, comparisonDate2, precision, inclusivity)', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{is-between '2016-10-30' '2016-10-30' '2017-12-30' precision='year' inclusivity='[]'}}`,
    );
    assert.dom(this.element).hasText('true');
  });

  test('can be called with null when allow-empty is set to true', async function (assert) {
    assert.expect(1);

    this.set('date', null);
    await render(hbs`{{is-between null null allow-empty=true}}`);
    assert.dom(this.element).hasText('');
  });
});
