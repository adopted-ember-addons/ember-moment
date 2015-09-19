import Ember from 'ember';
import hoursFromNow from '../../helpers/hours-from-now';
import moment from 'moment';
import momentToNow from 'ember-moment/computeds/to-now';

module('agoComputed', {
  setup() {
    moment.locale('en');
  }
});

function createSubject(attrs) {
  return Ember.Object.extend(Ember.$.extend({
    date: hoursFromNow(-1),
    ago: momentToNow('date')
  }, attrs || {})).create();
}

test('Formatter - get', (assert) => {
  assert.expect(1);
  const subject = createSubject();
  assert.equal(subject.get('ago'), 'in an hour');
});

test('Formatter - get #2', (assert) => {
  assert.expect(2);
  const subject = createSubject();
  assert.equal(subject.get('ago'), 'in an hour');
  subject.set('date', hoursFromNow(-2));
  assert.equal(subject.get('ago'), 'in 2 hours');
});
