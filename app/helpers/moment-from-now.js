import { get } from '@ember/object';
import FromNowHelper from 'ember-moment/helpers/moment-from-now';

import config from '../config/environment';

export default FromNowHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
