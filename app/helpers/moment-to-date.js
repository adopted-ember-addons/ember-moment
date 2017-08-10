import { get } from '@ember/object';
import ToDateHelper from 'ember-moment/helpers/moment-to-date';

import config from '../config/environment';

export default ToDateHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
