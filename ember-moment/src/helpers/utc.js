import { momentOrMomentTimezone as moment } from '../index.js';
import BaseHelper from './-base.js';

export default BaseHelper.extend({
  compute([utcTime, format]) {
    this._super(...arguments);

    return this.moment.utc(moment.utc(utcTime, format));
  },
});
