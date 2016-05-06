import Ember from 'ember';
import config from '../config/environment';
import IsSameOrAfterHelper from 'ember-moment/helpers/is-same-or-after';

export default IsSameOrAfterHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
