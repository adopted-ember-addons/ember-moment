import Ember from 'ember';
import FromNowHelper from 'ember-moment/helpers/moment-from-now';
import config from '../config/environment';

const { get } = Ember;

export default FromNowHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
