import Ember from 'ember';
import config from '../config/environment';
import MomentService from 'ember-moment/services/moment';

export default MomentService.extend({
  defaultFormat: Ember.get(config, 'moment.outputFormat')
});
