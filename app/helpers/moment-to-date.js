import Ember from 'ember';
import ToDateHelper from 'ember-moment/helpers/moment-to-date';
import config from '../config/environment';

const { get } = Ember;

export default ToDateHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
