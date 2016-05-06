import Ember from 'ember';
import config from '../config/environment';
import IsAfterHelper from 'ember-moment/helpers/is-after';

export default IsAfterHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
