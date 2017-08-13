import { get } from '@ember/object';
import MomentAddHelper from 'ember-moment/helpers/moment-add';

import config from '../config/environment';

export default MomentAddHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
