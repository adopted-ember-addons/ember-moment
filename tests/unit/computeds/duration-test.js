import moment from 'moment';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import duration from 'ember-moment/computeds/duration';
import humanize from 'ember-moment/computeds/humanize';
import locale from 'ember-moment/computeds/locale';

import { createSubject } from './test-helpers';

module('ember-moment@computed:duration', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    moment.locale('en');
  });

  test('get and set (ms)', function (assert) {
    assert.expect(2);

    const subject = createSubject.call(this, {
      ms: 5000,
      duration: humanize(duration('ms')),
    });

    assert.equal(subject.get('duration'), 'a few seconds');
    subject.set('ms', 10800000);
    assert.equal(subject.get('duration'), '3 hours');
  });

  test('computed composition using locale and humanize', function (assert) {
    assert.expect(2);

    const subject = createSubject.call(this, {
      ms: 5000,
      duration: humanize(locale(duration('ms'), 'es')),
    });

    assert.equal(subject.get('duration'), 'unos segundos');
    subject.set('ms', 10800000);
    assert.equal(subject.get('duration'), '3 horas');
  });

  test('get and set (days)', function (assert) {
    assert.expect(2);

    const subject = createSubject.call(this, {
      numDays: 4,
      duration: humanize(duration('numDays', 'days')),
    });

    assert.equal(subject.get('duration'), '4 days');
    subject.set('numDays', 1);
    assert.equal(subject.get('duration'), 'a day');
  });

  test('get literal (ms)', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      duration: humanize(duration(5000)),
    });

    assert.equal(subject.get('duration'), 'a few seconds');
  });
});
