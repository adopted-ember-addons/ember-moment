import Ember from 'ember';
import moment from 'moment';
import date from '../../helpers/date';
import { moduleFor, test } from 'ember-qunit';
import momentComputed from 'ember-moment/computeds/moment';

const { getOwner } = Ember;

moduleFor('ember-moment@computed:moment', {
  setup() {
    this.register('object:empty', Ember.Object.extend({}));
    moment.locale('en');
  }
});

function createSubject(attrs) {
  return getOwner(this).resolveRegistration('object:empty').extend(Ember.$.extend(attrs, {
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
