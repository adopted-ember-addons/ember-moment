import Ember from 'ember';
import MomentAddHelper from 'ember-moment/helpers/moment-add';
import config from '../config/environment';

const { get } = Ember;

export default MomentAddHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
