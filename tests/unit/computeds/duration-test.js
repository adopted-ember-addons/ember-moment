import Ember from 'ember';
import moment from 'moment';
import getOwner from 'ember-getowner-polyfill';
import { moduleFor, test } from 'ember-qunit';
import computedDuration from 'ember-moment/computeds/duration';

moduleFor('ember-moment@computed:duration', {
  setup() {
    this.register('object:empty', Ember.Object.extend({}));
    moment.locale('en');
  }
});

function createSubject(attrs={}) {
  return getOwner(this).resolveRegistration('object:empty').extend(Ember.$.extend(attrs, {
    container: this.container,
    registry: this.registry
  })).create();
}

test('get and set (ms)', function(assert) {
  assert.expect(2);

  const subject = createSubject.call(this, {
    ms: 5000,
    duration: computedDuration('ms')
  });

  assert.equal(subject.get('duration'), 'a few seconds');
  subject.set('ms', 10800000);
  assert.equal(subject.get('duration'), '3 hours');
});

test('get and set (days)', function(assert) {
  assert.expect(2);

  const subject = createSubject.call(this, {
    numDays: 4,
    duration: computedDuration('numDays', 'days')
  });

  assert.equal(subject.get('duration'), '4 days');
  subject.set('numDays', 1);
  assert.equal(subject.get('duration'), 'a day');
});

test('get literal (ms)', function(assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    duration: computedDuration(5000)
  });

  assert.equal(subject.get('duration'), 'a few seconds');
});
