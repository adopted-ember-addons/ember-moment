import Ember from 'ember';
import MomentService from 'ember-moment/services/moment';
import config from '../config/environment';

const { get } = Ember;

export default MomentService.extend({
  defaultFormat: get(config, 'moment.outputFormat')
});
