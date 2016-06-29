import Ember from 'ember';
import config from '../config/environment';
import MomentAddHelper from 'ember-moment/helpers/moment-add';

export default MomentAddHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
