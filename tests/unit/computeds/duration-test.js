import Ember from 'ember';
import computedDuration from 'ember-moment/computeds/duration';

module('durationComputed');

function createSubject(attrs) {
  return Ember.Object.extend(Ember.$.extend(attrs, {})).create();
}

test('Milliseconds - get', (assert) => {
  const subject = createSubject({
    ms: 5000,
    duration: computedDuration('ms')
  });
  assert.equal(subject.get('duration'), 'a few seconds');
	subject.set('ms', 10800000);
	assert.equal(subject.get('duration'), '3 hours');
});

test('Units - get', (assert) => {
  const subject = createSubject({
    numDays: 4,
    duration: computedDuration('numDays', 'days')
  });
  assert.equal(subject.get('duration'), '4 days');
  subject.set('numDays', 1);
  assert.equal(subject.get('duration'), 'a day');
});
