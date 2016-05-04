import Ember from 'ember';
import config from '../config/environment';
import IsBetweenHelper from 'ember-moment/helpers/is-between';

export default IsBetweenHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
