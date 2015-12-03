import Ember from 'ember';
import moment from 'moment';
import momentFormat from 'ember-moment/computeds/format';
import date from '../../helpers/date';

module('momentComputed', {
  setup() {
    moment.locale('en');
  }
});

let { observer, computed } = Ember;
let alias = computed.alias;

function createSubject(attrs) {
  return Ember.Object.extend(Ember.$.extend({
    date: date(0),
    shortDate: momentFormat('date', 'MM/DD')
  }, attrs || {})).create();
}

test('Formatter - get', (assert) => {
  assert.expect(1);
  const subject = createSubject();
  assert.equal(subject.get('shortDate'), '12/31');
});

test('Date - set', (assert) => {
  assert.expect(1);
  const subject = createSubject();
  subject.set('date', date('2013-02-08T09:30:26'));
  assert.equal(subject.get('shortDate'), '02/08');
});

test('Formatter - invalid date', (assert) => {
  assert.expect(1);
  const subject = createSubject({ date: 'ZZZZZ' });
  assert.equal(subject.get('shortDate'), 'Invalid date');
});

test('Formatter - is computed handled', (assert) => {
  assert.expect(2);
  const subject = createSubject({
    _format: 'MM/DD',
    format: alias('_format'),
    shortDate: momentFormat('date', 'format')
  });
  assert.equal(subject.get('shortDate'), '12/31');
  subject.set('_format', 'MM');
  assert.equal(subject.get('shortDate'), '12');
});

test('Formatter - outputFormat config option is respected', (assert) => {
  assert.expect(2);

  const subject = createSubject({
    date: '2013-01-01',
    shortDate: momentFormat('date'),

    container: {
      lookupFactory() {
        return {
          moment: {
            outputFormat: 'YYYY'
          }
        };
      }
    }
  });

  assert.equal(subject.get('shortDate'), '2013');
  subject.set('date', '2014-01-01');
  assert.equal(subject.get('shortDate'), '2014');
});

test('Observers trigger on date change', (assert) => {
  assert.expect(2);
  let observeFired = false;

  const subject = createSubject({
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

test('Observers trigger on date change', (assert) => {
  assert.expect(3);
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
