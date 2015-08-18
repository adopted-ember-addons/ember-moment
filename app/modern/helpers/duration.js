import Ember from 'ember';
import Helper from './moment-duration';

export default Helper.extend({
  compute() {
    Ember.deprecate('ember-moment: `duration` helper has been renamed to `moment-duration`');
    return this._super.apply(this, arguments);
  }
});
