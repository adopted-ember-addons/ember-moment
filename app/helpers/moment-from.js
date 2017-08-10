import { get } from '@ember/object';
import FromHelper from 'ember-moment/helpers/moment-from';

import config from '../config/environment';

export default FromHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
