import Ember from 'ember';
import getDependentKeys from 'ember-moment/utils/get-dependent-keys';
import format from 'ember-moment/computeds/format';

const { computed } = Ember;

module('utils:get-dependent-keys');

test('exists', function(assert) {
  assert.equal(typeof getDependentKeys, 'function');
});

test('it returns multiple keys', function(assert) {
  const obj = Ember.Object.extend({
    baz: 'bazz',
    bar: 'barr',
    foo: computed.alias('bar', 'baz')
  }).create();

  assert.equal(getDependentKeys.call(obj, 'foo').join(','), 'bar, baz');
});

test('it will ignore literals', function(assert) {
  const obj = Ember.Object.extend({
    outputFormat: 'MM/DD/YYYY',
    inputFormat: 'LLLL',
    formattedTime: format(0, 'outputFormat', 'inputFormat')
  }).create();

  assert.equal(getDependentKeys.call(obj, 'formattedTime').join(','), 'outputFormat, inputFormat');
});
