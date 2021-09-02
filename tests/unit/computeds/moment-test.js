import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import $ from 'jquery';
import moment from 'moment';
import date from '../../helpers/date';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import momentComputed from 'ember-moment/computeds/moment';

module('ember-moment@computed:moment', function(hooks) {
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
      date: date(0),
      computedDate: momentComputed('date')
    });

    assert.equal(subject.get('computedDate').format('MM/DD/YYYY'), '12/31/1969');
  });

  test('get and set', function(assert) {
    assert.expect(2);

    const subject = createSubject.call(this, {
      date: date(0),
      computedDate: momentComputed('date')
    });

    assert.equal(subject.get('computedDate').format('MM/DD/YYYY'), '12/31/1969');
    subject.set('date', moment(date(0)).add(1, 'day'));
    assert.equal(subject.get('computedDate').format('MM/DD/YYYY'), '01/01/1970');
  });

  test('get with literal', function(assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      computedDate: momentComputed(date(0))
    });

    assert.equal(subject.get('computedDate').format('MM/DD/YYYY'), '12/31/1969');
  });
});
