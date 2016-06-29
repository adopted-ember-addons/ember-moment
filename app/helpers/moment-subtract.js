import Ember from 'ember';
import config from '../config/environment';
import MomentSubtractHelper from 'ember-moment/helpers/moment-subtract';

export default MomentSubtractHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
