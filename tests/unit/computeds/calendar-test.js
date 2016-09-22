import Ember from 'ember';
import moment from 'moment';
import getOwner from 'ember-moment/utils/get-owner';
import { moduleFor, test } from 'ember-qunit';
import calendar from 'ember-moment/computeds/calendar';
import tz from 'ember-moment/computeds/tz';
import locale from 'ember-moment/computeds/locale';

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

test('two args (date, referenceDate)', function(assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    date: tz(moment('2013-01-01T02:30:26Z'), 'America/New_York'),
    referenceDate: moment('2013-01-01T12:00:00Z'),
    computedDate: calendar('date', 'referenceDate')
  });

  assert.equal(subject.get('computedDate'), 'Yesterday at 9:30 PM');
});

test('with es locale', function(assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    date: tz(locale(moment('2013-01-01T08:30:26Z'), 'es'), 'America/New_York'),
    referenceDate: locale(moment('2013-01-01T12:00:00Z'), 'es'),
    computedDate: calendar('date', 'referenceDate')
  });

  assert.equal(subject.get('computedDate'), 'hoy a las 3:30');
});
