import { get } from '@ember/object';
import IsBeforeHelper from 'ember-moment/helpers/is-before';

import config from '../config/environment';

export default IsBeforeHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
