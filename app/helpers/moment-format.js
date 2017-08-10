import { get } from '@ember/object';
import FormatHelper from 'ember-moment/helpers/moment-format';

import config from '../config/environment';

export default FormatHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
