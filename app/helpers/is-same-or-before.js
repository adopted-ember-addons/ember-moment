import Ember from 'ember';
import config from '../config/environment';
import IsSameOrBeforeHelper from 'ember-moment/helpers/is-same-or-before';

export default IsSameOrBeforeHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
