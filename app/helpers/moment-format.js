import Ember from 'ember';
import FormatHelper from 'ember-moment/helpers/moment-format';
import config from '../config/environment';

const { get } = Ember;

export default FormatHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
