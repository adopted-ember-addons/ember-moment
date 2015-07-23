import Ember from 'ember';
import { module } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Smoke', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    if (application) {
      Ember.run(application, 'destroy');
    }
  }
});

test('moment', (assert) => {
  assert.expect(1);
  visit('/smoke');
  andThen(function() {
    assert.equal(find('.moment-independence-day').text(), 'Jul 04, 1776');
  });
});

test('ago', (assert) => {
  assert.expect(1);
  visit('/smoke');
  andThen(function() {
    assert.equal(find('.ago-now').text(), 'a few seconds ago');
  });
});

test('duration', (assert) => {
  assert.expect(1);
  visit('/smoke');
  andThen(function() {
    assert.equal(find('.duration-seven-minutes').text(), '7 minutes');
  });
});
