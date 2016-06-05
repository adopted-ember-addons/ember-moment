import Ember from 'ember';
import config from '../config/environment';
import ToDateHelper from 'ember-moment/helpers/moment-to-date';

export default ToDateHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
