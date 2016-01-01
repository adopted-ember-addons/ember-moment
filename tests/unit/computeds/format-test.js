import Ember from 'ember';
import moment from 'moment';
import getOwner from 'ember-getowner-polyfill';
import { moduleFor, test } from 'ember-qunit';
import momentFormat from 'ember-moment/computeds/format';
import date from '../../helpers/date';

moduleFor('ember-moment@computed:format', {
  setup() {
    this.register('object:empty', Ember.Object.extend({}));
    moment.locale('en');
  }
});

const { observer, computed } = Ember;
const { alias } = computed;

function createSubject(attrs = {}) {
  return getOwner(this).resolveRegistration('object:empty').extend(Ember.$.extend({
    date: date(0),
    shortDate: momentFormat('date', 'MM/DD'),
    container: this.container,
    registry: this.registry
  }, attrs)).create();
}

test('get value as dependent key, format as dependent key', function(assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    dateFormat: 'MM/DD',
    shortDate: momentFormat('date', 'dateFormat')
  });

  assert.equal(subject.get('shortDate'), '12/31');
});

test('get value as literal, format as literal', function(assert) {
  assert.expect(1);
  const subject = createSubject.call(this, undefined);
  assert.equal(subject.get('shortDate'), '12/31');
});

test('get literal', function(assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    shortDate: momentFormat(date(0), 'MM/DD')
  });

  assert.equal(subject.get('shortDate'), '12/31');
});

test('single argument supported', function(assert) {
  assert.expect(1);

  const timestamp = date(0);

  const subject = createSubject.call(this, {
    shortDate: momentFormat(timestamp)
  });

  assert.equal(subject.get('shortDate'), moment(timestamp).format());
});

test('Date - set', function(assert) {
  assert.expect(1);
  const subject = createSubject.call(this, undefined);
  subject.set('date', date('2013-02-08T09:30:26'));
  assert.equal(subject.get('shortDate'), '02/08');
});

test('invalid date', function(assert) {
  assert.expect(1);
  const subject = createSubject.call(this, { date: 'ZZZZZ' });
  assert.equal(subject.get('shortDate'), 'Invalid date');
});

test('is computed handled', function(assert) {
  assert.expect(2);
  const subject = createSubject.call(this, {
    _format: 'MM/DD',
    format: alias('_format'),
    shortDate: momentFormat('date', 'format')
  });
  assert.equal(subject.get('shortDate'), '12/31');
  subject.set('_format', 'MM');
  assert.equal(subject.get('shortDate'), '12');
});

test('outputFormat  option is respected', function(assert) {
  assert.expect(2);

  this.register('config:environment', {
    moment: {
      outputFormat: 'YYYY'
    }
  });

  const subject = createSubject.call(this, {
    date: '2013-01-01',
    shortDate: momentFormat('date')
  });

  assert.equal(subject.get('shortDate'), '2013');
  subject.set('date', '2014-01-01');
  assert.equal(subject.get('shortDate'), '2014');
});

test('Observers trigger on date change', function(assert) {
  assert.expect(2);
  let observeFired = false;

  const subject = createSubject.call(this, {
    _format: 'MM/DD',
    format: alias('_format'),
    shortDate: momentFormat('date', 'format'),
    shortDateChanged: observer('shortDate', () => {
      observeFired = true;
    })
  });

  assert.equal(subject.get('shortDate'), '12/31');
  subject.set('_format', 'MM');
  assert.equal(observeFired, true);
});

test('Observers trigger on date change', function(assert) {
  assert.expect(3);
  let observeFired = false;

  const subject = createSubject.call(this, {
    shortDateChanged: observer('shortDate', () => {
      observeFired = true;
    })
  });

  assert.equal(subject.get('shortDate'), '12/31');
  subject.set('date', date('2013-02-08T09:30:26'));
  assert.equal(subject.get('shortDate'), '02/08');
  assert.equal(observeFired, true);
});
