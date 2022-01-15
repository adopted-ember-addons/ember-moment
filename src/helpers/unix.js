import { momentOrMomentTimezone as moment } from '../index';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute([unixTimeStamp]) {
    this._super(...arguments);

    return this.moment.moment(moment.unix(unixTimeStamp));
  },
});
