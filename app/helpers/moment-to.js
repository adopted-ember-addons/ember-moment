import Ember from 'ember';
import ToHelper from 'ember-moment/helpers/moment-to';
import config from '../config/environment';

const { get } = Ember;

export default ToHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
