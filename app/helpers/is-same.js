import { get } from '@ember/object';
import IsSameHelper from 'ember-moment/helpers/is-same';

import config from '../config/environment';

export default IsSameHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
