import Ember from 'ember';
import momentDurationHelper from '../moment-duration';

export default function() {
  Ember.deprecate('ember-moment: `duration` helper has been renamed to `moment-duration`');
  return momentDurationHelper(...arguments);
}
