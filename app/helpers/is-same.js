import Ember from 'ember';
import config from '../config/environment';
import IsSameHelper from 'ember-moment/helpers/is-same';

export default IsSameHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
