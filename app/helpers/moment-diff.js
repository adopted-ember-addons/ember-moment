import Ember from 'ember';
import config from '../config/environment';
import DiffHelper from 'ember-moment/helpers/moment-diff';

export default DiffHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
