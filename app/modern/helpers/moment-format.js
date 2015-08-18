import Ember from 'ember';
import config from '../config/environment';
import Helper from 'ember-moment/helpers/moment-format';

export default Helper.extend({
	globalOuputFormat: Ember.get(config, 'moment.outputFormat'),
	globalAllowEmpty: Ember.get(config, 'moment.allowEmpty')
});
