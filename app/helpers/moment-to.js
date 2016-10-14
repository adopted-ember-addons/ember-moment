import Ember from 'ember';
import config from '../config/environment';
import ToHelper from 'ember-moment/helpers/moment-to';

export default ToHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
