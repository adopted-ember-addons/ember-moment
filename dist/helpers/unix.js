import { momentOrMomentTimezone } from '../index.js';
import BaseHelper from './-base.js';

var unix = BaseHelper.extend({
  compute([unixTimeStamp]) {
    this._super(...arguments);
    return this.moment.moment(momentOrMomentTimezone.unix(unixTimeStamp));
  }
});

export { unix as default };
//# sourceMappingURL=unix.js.map
