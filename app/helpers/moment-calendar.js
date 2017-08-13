import { get } from '@ember/object';
import CalendarHelper from 'ember-moment/helpers/moment-calendar';

import config from '../config/environment';

export default CalendarHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
