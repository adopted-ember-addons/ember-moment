import Ember from 'ember';
import config from '../config/environment';
import IsBeforeHelper from 'ember-moment/helpers/is-before';

export default IsBeforeHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
