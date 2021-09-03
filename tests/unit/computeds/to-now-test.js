import moment from 'moment';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import toNow from 'ember-moment/computeds/to-now';
import momentComputed from 'ember-moment/computeds/moment';
import { createSubject } from './test-helpers';

module('ember-moment@computed:to-now', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    moment.locale('en');
  });

  test('get', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      date: moment().subtract(1, 'hour'),
      ago: toNow('date'),
    });

    assert.equal(subject.get('ago'), 'in an hour');
  });

  test('get and set', function (assert) {
    assert.expect(2);

    const subject = createSubject.call(this, {
      date: moment().subtract(1, 'hour'),
      ago: toNow('date'),
    });

    assert.equal(subject.get('ago'), 'in an hour');
    subject.set('date', moment().subtract(2, 'hour'));
    assert.equal(subject.get('ago'), 'in 2 hours');
  });

  test('get literal', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: toNow(moment().subtract(1, 'hour')),
    });

    assert.equal(subject.get('ago'), 'in an hour');
  });

  test('get literal hide prefix', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: toNow(moment().subtract(1, 'hour'), 'LLLL', true),
    });

    assert.equal(subject.get('ago'), 'an hour');
  });

  test('get literal with prefix', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: toNow(moment().subtract(1, 'hour'), 'LLLL', false),
    });

    assert.equal(subject.get('ago'), 'in an hour');
  });

  test('composition with momentComputed get literal without suffix', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: toNow(momentComputed(moment().subtract(1, 'hour'), 'LLLL'), true),
    });

    assert.equal(subject.get('ago'), 'an hour');
  });

  test('composition with momentComputed get literal with suffix', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: toNow(momentComputed(moment().subtract(1, 'hour'), 'LLLL'), false),
    });

    assert.equal(subject.get('ago'), 'in an hour');
  });
});
