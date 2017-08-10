import { get } from '@ember/object';
import ToNowHelper from 'ember-moment/helpers/moment-to-now';

import config from '../config/environment';

export default ToNowHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
