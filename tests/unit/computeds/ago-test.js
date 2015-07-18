import Ember from 'ember';
import { ago as computedAgo } from 'ember-moment/computed';

module('agoComputed');

function createSubject(attrs) {
  return Ember.Object.extend(Ember.$.extend({
    date: new Date(new Date().valueOf() - (60*60*1000)),
    ago: computedAgo('date')
  }, attrs || {})).create();
}

test('Formatter - get', (assert) => {
  const subject = createSubject();
  assert.equal(subject.get('ago'), 'an hour ago');
});

test('Formatter - get #2', (assert) => {
  const subject = createSubject();
  assert.equal(subject.get('ago'), 'an hour ago');
	subject.set('date', new Date(new Date().valueOf() - (60*60*2000)));
	assert.equal(subject.get('ago'), '2 hours ago');
});
