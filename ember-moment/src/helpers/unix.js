import { momentOrMomentTimezone as moment } from '../index.js';
import BaseHelper from './-base.js';

export default BaseHelper.extend({
  compute([unixTimeStamp]) {
    this._super(...arguments);

    return this.moment.moment(moment.unix(unixTimeStamp));
  },
});
