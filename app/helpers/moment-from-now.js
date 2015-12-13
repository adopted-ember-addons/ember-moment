import Ember from 'ember';
import config from '../config/environment';
import DurationHelper from 'ember-moment/helpers/moment-from-now';

export default DurationHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
