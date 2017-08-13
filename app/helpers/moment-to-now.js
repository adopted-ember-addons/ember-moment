import Ember from 'ember';
import ToNowHelper from 'ember-moment/helpers/moment-to-now';
import config from '../config/environment';

const { get } = Ember;

export default ToNowHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
