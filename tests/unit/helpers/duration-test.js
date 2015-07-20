import duration from 'ember-moment/helpers/duration';
import callHelper from '../../helpers/call-helper';

module('DurationHelper');

const FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (ms)', (assert) => {
  assert.equal(callHelper(duration, [86400000, FAKE_HANDLEBARS_CONTEXT]), 'a day');
  assert.equal(callHelper(duration, ['',  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds');
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
  assert.equal(callHelper(duration, [object,  FAKE_HANDLEBARS_CONTEXT]), '2 years');
});

test('one arg (string)', (assert) => {
  assert.equal(callHelper(duration, ['23:59:59',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});

test('two args (value, units)', (assert) => {
  assert.equal(callHelper(duration, [1, 'minutes', FAKE_HANDLEBARS_CONTEXT]), 'a minute');
  assert.equal(callHelper(duration, [24, 'hours',  FAKE_HANDLEBARS_CONTEXT]), 'a day');
});
