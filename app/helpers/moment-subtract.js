import { get } from '@ember/object';
import MomentSubtractHelper from 'ember-moment/helpers/moment-subtract';

import config from '../config/environment';

export default MomentSubtractHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
