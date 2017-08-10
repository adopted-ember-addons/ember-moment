import { get } from '@ember/object';
import IsSameOrAfterHelper from 'ember-moment/helpers/is-same-or-after';

import config from '../config/environment';

export default IsSameOrAfterHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
