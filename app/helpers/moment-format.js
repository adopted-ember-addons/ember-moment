import Ember from 'ember';
import config from '../config/environment';
import FormatHelper from 'ember-moment/helpers/moment-format';

export default FormatHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
