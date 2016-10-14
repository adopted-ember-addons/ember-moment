import Ember from 'ember';
import config from '../config/environment';
import FromHelper from 'ember-moment/helpers/moment-from';

export default FromHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
