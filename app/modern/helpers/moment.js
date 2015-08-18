import Ember from 'ember';
import Helper from './moment-format';

export default Helper.extend({
  compute() {
    Ember.deprecate('ember-moment: `moment` helper has been renamed to `moment-format`');
    return this._super.apply(this, arguments);
  }
});
