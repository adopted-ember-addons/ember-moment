import Ember from "ember";
import config from '../config/environment';

export function initialize(instance) {
  const momentService = instance.container.lookup("service:moment");
  let defaultFormat = Ember.get(config, 'moment.outputFormat');
  momentService.set('defaultFormat', defaultFormat || 'LLLL');
}

export default {
  name: 'moment-default-format',
  initialize
};
