import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import $ from 'jquery';
import moment from 'moment';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import fromNow from 'ember-moment/computeds/from-now';
import momentComputed from 'ember-moment/computeds/moment';

module('ember-moment@computed:from-now', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.setup = () => {
      this.owner.register('object:empty', EmberObject.extend({}));
      moment.locale('en');
    };
  });

  function createSubject(attrs) {
    return getOwner(this).resolveRegistration('object:empty').extend($.extend(attrs, {
      container: this.container,
      registry: this.registry
    })).create();
  }

  test('get', function(assert) {
    assert.expect(1);
    const subject = createSubject.call(this, {
      date: moment().subtract(1, 'hour'),
      ago: fromNow('date')
    });
    assert.equal(subject.get('ago'), 'an hour ago');
  });

  test('get and set', function(assert) {
    assert.expect(2);

    const subject = createSubject.call(this, {
      date: moment().subtract(1, 'hour'),
      ago: fromNow('date')
    });

    assert.equal(subject.get('ago'), 'an hour ago');
    subject.set('date', moment().subtract(2, 'hour'));
    assert.equal(subject.get('ago'), '2 hours ago');
  });

  test('get literal', function(assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: fromNow(moment().subtract(1, 'hour'))
    });

    assert.equal(subject.get('ago'), 'an hour ago');
  });

  test('get literal without suffixx', function(assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: fromNow(moment().subtract(1, 'hour'), 'LLLL', true)
    });

    assert.equal(subject.get('ago'), 'an hour');
  });

  test('get literal with suffix', function(assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: fromNow(moment().subtract(1, 'hour'), 'LLLL', false)
    });

    assert.equal(subject.get('ago'), 'an hour ago');
  });

  test('composition with momentComputed get literal without suffix', function(assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: fromNow(momentComputed(moment().subtract(1, 'hour'), 'LLLL'), true)
    });

    assert.equal(subject.get('ago'), 'an hour');
  });

  test('composition with momentComputed get literal with suffix', function(assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      ago: fromNow(momentComputed(moment().subtract(1, 'hour'), 'LLLL'), false)
    });

    assert.equal(subject.get('ago'), 'an hour ago');
  });
});
