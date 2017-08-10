import { get } from '@ember/object';
import ToHelper from 'ember-moment/helpers/moment-to';

import config from '../config/environment';

export default ToHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
