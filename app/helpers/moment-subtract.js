import Ember from 'ember';
import MomentSubtractHelper from 'ember-moment/helpers/moment-subtract';
import config from '../config/environment';

const { get } = Ember;

export default MomentSubtractHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
