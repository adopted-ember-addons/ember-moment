import { get } from '@ember/object';
import IsAfterHelper from 'ember-moment/helpers/is-after';

import config from '../config/environment';

export default IsAfterHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
