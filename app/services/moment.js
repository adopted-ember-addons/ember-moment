import { get } from '@ember/object';
import MomentService from 'ember-moment/services/moment';

import config from '../config/environment';

export default MomentService.extend({
  defaultFormat: get(config, 'moment.outputFormat')
});
