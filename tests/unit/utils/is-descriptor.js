import Ember from 'ember';
import isDescriptor from 'ember-moment/utils/is-descriptor';

module('utils:is-descriptor');

test('exists', function(assert) {
  assert.equal(typeof isDescriptor, 'function');
});

test('it detects computeds', function(assert) {
  const obj = Ember.Object.extend({
    bar: true,
    foo: Ember.computed.alias('bar')
  }).create();

  assert.ok(isDescriptor(obj.foo));
});

test('it does not detect non-computeds', function(assert) {
  const obj = Ember.Object.extend({
    foo: true
  }).create();

  assert.equal(isDescriptor(obj.foo), false);
});
