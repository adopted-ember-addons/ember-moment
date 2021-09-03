import EmberObject from '@ember/object';
import { observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import moment from 'moment';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import format from 'ember-moment/computeds/format';
import momentComputed from 'ember-moment/computeds/moment';

import date from '../../helpers/date';
import { createSubject } from './test-helpers';

module('ember-moment@computed:format', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'object:empty',
      // eslint-disable-next-line ember/no-classic-classes
      EmberObject.extend({
        date: date(0),
        shortDate: format('date', 'MM/DD'),
      })
    );
    moment.locale('en');
  });

  test('get value as dependent key, format as dependent key', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      dateFormat: 'MM/DD',
      shortDate: format('date', 'dateFormat'),
    });

    assert.equal(subject.get('shortDate'), '12/31');
  });

  test('can contain spaces in the format argument', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      shortDate: format('date', 'MM DD'),
    });

    assert.equal(subject.get('shortDate'), '12 31');
  });

  test('composition with moment computed: get value as dependent key, format as dependent key', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      dateFormat: 'MM/DD',
      shortDate: format(momentComputed('date'), 'dateFormat'),
    });

    assert.equal(subject.get('shortDate'), '12/31');
  });

  test('get value as literal, format as literal', function (assert) {
    assert.expect(1);
    const subject = createSubject.call(this, {});
    assert.equal(subject.get('shortDate'), '12/31');
  });

  test('get literal', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      shortDate: format(date(0), 'MM/DD'),
    });

    assert.equal(subject.get('shortDate'), '12/31');
  });

  test('single argument supported', function (assert) {
    assert.expect(1);

    const timestamp = date(0);

    const subject = createSubject.call(this, {
      shortDate: format(timestamp),
    });

    assert.equal(subject.get('shortDate'), moment(timestamp).format('LLLL'));
  });

  test('Date - set', function (assert) {
    assert.expect(1);
    const subject = createSubject.call(this, {});
    subject.set('date', date('2013-02-08T09:30:26'));
    assert.equal(subject.get('shortDate'), '02/08');
  });

  test('invalid date', function (assert) {
    assert.expect(1);
    const subject = createSubject.call(this, { date: 'ZZZZZ' });
    assert.equal(subject.get('shortDate'), 'Invalid date');
  });

  test('is computed handled', function (assert) {
    assert.expect(2);
    const subject = createSubject.call(this, {
      _format: 'MM/DD',
      format: alias('_format'),
      shortDate: format('date', 'format'),
    });
    assert.equal(subject.get('shortDate'), '12/31');
    subject.set('_format', 'MM');
    assert.equal(subject.get('shortDate'), '12');
  });

  test('composition with moment compouted: is computed handled', function (assert) {
    assert.expect(2);
    const subject = createSubject.call(this, {
      _format: 'MM/DD',
      format: alias('_format'),
      shortDate: format(momentComputed('date'), 'format'),
    });
    assert.equal(subject.get('shortDate'), '12/31');
    subject.set('_format', 'MM');
    assert.equal(subject.get('shortDate'), '12');
  });

  test('outputFormat  option is respected', function (assert) {
    assert.expect(2);

    this.owner.register('config:environment', {
      moment: {
        outputFormat: 'YYYY',
      },
    });

    const subject = createSubject.call(this, {
      date: '2013-01-01',
      shortDate: format('date'),
    });

    assert.equal(subject.get('shortDate'), '2013');
    subject.set('date', '2014-01-01');
    assert.equal(subject.get('shortDate'), '2014');
  });

  test('Observers trigger on date change (overrides)', async function (assert) {
    assert.expect(2);
    let observeFired = false;

    const subject = createSubject.call(this, {
      _format: 'MM/DD',
      format: alias('_format'),
      shortDate: format('date', 'format'),
      // eslint-disable-next-line ember/no-observers
      shortDateChanged: observer('shortDate', () => {
        observeFired = true;
      }),
    });

    assert.equal(subject.get('shortDate'), '12/31');
    subject.set('_format', 'MM');
    await settled();
    assert.equal(observeFired, true);
  });

  test('Observers trigger on date change', async function (assert) {
    assert.expect(3);
    let observeFired = false;

    const subject = createSubject.call(this, {
      // eslint-disable-next-line ember/no-observers
      shortDateChanged: observer('shortDate', () => {
        observeFired = true;
      }),
    });

    assert.equal(subject.get('shortDate'), '12/31');
    subject.set('date', date('2013-02-08T09:30:26'));
    await settled();
    assert.equal(subject.get('shortDate'), '02/08');
    assert.equal(observeFired, true);
  });
});
