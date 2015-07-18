import Ember from 'ember';
import { initialize } from '../../../initializers/ember-moment';

let { Container, Application } = Ember;
let container, application;

module('EmberMomentInitializer', {
  setup() {
    Ember.run(() => {
      container = new Container();
      application = Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', (assert) => {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
