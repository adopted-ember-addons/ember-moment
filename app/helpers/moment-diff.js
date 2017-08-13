import Ember from 'ember';
import DiffHelper from 'ember-moment/helpers/moment-diff';
import config from '../config/environment';

const { get } = Ember;

export default DiffHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
