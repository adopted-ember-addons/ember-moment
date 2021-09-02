import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Smoke', function(hooks) {
  hooks.beforeEach(function() {
    application = startApp();
  });

  hooks.afterEach(function() {
    if (application) {
      run(application, 'destroy');
    }
  });

  test('moment', function(assert) {
    assert.expect(1);
    visit('/smoke');
    andThen(function() {
      assert.equal(find('.moment-independence-day').text(), 'Jul 04, 1776');
    });
  });

  test('ago', function(assert) {
    assert.expect(1);
    visit('/smoke');
    andThen(function() {
      assert.equal(find('.ago-now').text(), 'a few seconds ago');
    });
  });

  test('duration', function(assert) {
    assert.expect(1);
    visit('/smoke');
    andThen(function() {
      assert.equal(find('.duration-seven-minutes').text(), '7 minutes');
    });
  });
});
