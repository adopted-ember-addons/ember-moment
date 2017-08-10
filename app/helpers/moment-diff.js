import { get } from '@ember/object';
import DiffHelper from 'ember-moment/helpers/moment-diff';

import config from '../config/environment';

export default DiffHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
