import Ember from 'ember';
import moment from 'moment';
import getOwner from 'ember-getowner-polyfill';
import { moduleFor, test } from 'ember-qunit';
import momentFromNow from 'ember-moment/computeds/from-now';

import hoursFromNow from '../../helpers/hours-from-now';

moduleFor('ember-moment@computed:from-now', {
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

test('get', function(assert) {
  assert.expect(1);
  const subject = createSubject.call(this, {
    date: hoursFromNow(-1),
    ago: momentFromNow('date')
  });
  assert.equal(subject.get('ago'), 'an hour ago');
});

test('get and set', function(assert) {
  assert.expect(2);

  const subject = createSubject.call(this, {
    date: hoursFromNow(-1),
    ago: momentFromNow('date')
  });

  assert.equal(subject.get('ago'), 'an hour ago');
  subject.set('date', hoursFromNow(-2));
  assert.equal(subject.get('ago'), '2 hours ago');
});

test('get literal', function(assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    ago: momentFromNow(hoursFromNow(-1))
  });

  assert.equal(subject.get('ago'), 'an hour ago');
});

test('get literal without suffix', function(assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    ago: momentFromNow(hoursFromNow(-1), 'LLLL', true)
  });

  assert.equal(subject.get('ago'), 'an hour');
});

test('get literal with suffix', function(assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    ago: momentFromNow(hoursFromNow(-1), 'LLLL', false)
  });

  assert.equal(subject.get('ago'), 'an hour ago');
});
