import { get } from '@ember/object';
import IsBetweenHelper from 'ember-moment/helpers/is-between';

import config from '../config/environment';

export default IsBetweenHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
