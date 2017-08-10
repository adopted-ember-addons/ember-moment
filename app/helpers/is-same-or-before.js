import { get } from '@ember/object';
import IsSameOrBeforeHelper from 'ember-moment/helpers/is-same-or-before';

import config from '../config/environment';

export default IsSameOrBeforeHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
