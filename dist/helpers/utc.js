import { momentOrMomentTimezone } from '../index.js';
import BaseHelper from './-base.js';

var utc = BaseHelper.extend({
  compute([utcTime, format]) {
    this._super(...arguments);
    return this.moment.utc(momentOrMomentTimezone.utc(utcTime, format));
  }
});

export { utc as default };
//# sourceMappingURL=utc.js.map
