import Ember from 'ember';
import config from '../config/environment';
import ToNowHelper from 'ember-moment/helpers/moment-to-now';

export default ToNowHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
