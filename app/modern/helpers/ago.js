import Ember from 'ember';
import Helper from './moment-from-now';

export default Helper.extend({
  compute() {
    Ember.deprecate('ember-moment: `ago` helper has been renamed to `moment-from-now`');
    return this._super.apply(this, arguments);
  }
});
