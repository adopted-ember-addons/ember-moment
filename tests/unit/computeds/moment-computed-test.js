import Ember from 'ember';
import date from '../helpers/date';
import computedMoment from 'ember-moment/computeds/moment';

module('momentComputed');

let { observer, computed } = Ember;
let alias = computed.alias;

function createSubject(attrs) {
  return Ember.Object.extend(Ember.$.extend({
    date: date(0),
    shortDate: computedMoment('date', 'MM/DD')
  }, attrs || {})).create();
}

test('Formatter - get', (assert) => {
  const subject = createSubject();
  assert.equal(subject.get('shortDate'), '12/31');
});

test('Date - set', (assert) => {
  const subject = createSubject();
  subject.set('date', date('2013-02-08T09:30:26'));
  assert.equal(subject.get('shortDate'), '02/08');
});

test('Formatter - invalid date', (assert) => {
  const subject = createSubject({ date: 'ZZZZZ' });
  assert.equal(subject.get('shortDate'), 'Invalid date');
});

test('Formatter - is computed handled', (assert) => {
  const subject = createSubject({
    _format: 'MM/DD',
    format: alias('_format'),
    shortDate: computedMoment('date', 'format')
  });
  assert.equal(subject.get('shortDate'), '12/31');
  subject.set('_format', 'MM');
  assert.equal(subject.get('shortDate'), '12');
});

test('Observers trigger on date change', (assert) => {
  let observeFired = false;

  const subject = createSubject({
    _format: 'MM/DD',
    format: alias('_format'),
    shortDate: computedMoment('date', 'format'),
    shortDateChanged: observer('shortDate', () => {
      observeFired = true;
    })
  });

  assert.equal(subject.get('shortDate'), '12/31');
  subject.set('_format', 'MM');
  assert.equal(observeFired, true);
});

test('Observers trigger on date change', (assert) => {
  let observeFired = false;

  const subject = createSubject({
    shortDateChanged: observer('shortDate', () => {
      observeFired = true;
    })
  });

  assert.equal(subject.get('shortDate'), '12/31');
  subject.set('date', date('2013-02-08T09:30:26'));
  assert.equal(subject.get('shortDate'), '02/08');
  assert.equal(observeFired, true);
});
