import moment from 'moment';
import durationHelper from 'ember-moment/helpers/duration';
import callHelper from '../../helpers/call-helper';

module('DurationHelper', {
  setup() {
    moment.locale('en');
  }
});

const FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (ms)', (assert) => {
  assert.equal(callHelper(durationHelper, [86400000, FAKE_HANDLEBARS_CONTEXT]), 'a day');
  assert.equal(callHelper(durationHelper, ['',  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds');
});

test('one arg (object)', (assert) => {
  const object = {
    seconds: 2,
    minutes: 2,
    hours: 2,
    days: 2,
    weeks: 2,
    months: 2,
    years: 2
  };
  assert.equal(callHelper(durationHelper, [object,  FAKE_HANDLEBARS_CONTEXT]), '2 years');
});

test('one arg (string)', (assert) => {
  assert.equal(callHelper(durationHelper, ['23:59:59',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});

test('two args (value, units)', (assert) => {
  assert.equal(callHelper(durationHelper, [1, 'minutes', FAKE_HANDLEBARS_CONTEXT]), 'a minute');
  assert.equal(callHelper(durationHelper, [24, 'hours',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});
