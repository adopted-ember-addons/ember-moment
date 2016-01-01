import Ember from 'ember';
import getValue from 'ember-moment/utils/get-value';

module('utils:get-value');

test('exists', function(assert) {
  assert.equal(typeof getValue, 'function');
});

test('it returns underlying value from computed', function(assert) {
  const obj = Ember.Object.extend({
    bar: 'baz',
    foo: Ember.computed.alias('bar')
  }).create();

  assert.equal(getValue.call(obj, 'foo'), 'baz');
});

test('it returns underlying literal value', function(assert) {
  const obj = Ember.Object.extend({
    foo: 'baz'
  }).create();

  assert.equal(getValue.call(obj, 'foo'), 'baz');
});
