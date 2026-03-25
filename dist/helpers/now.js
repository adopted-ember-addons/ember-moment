import { momentOrMomentTimezone } from '../index.js';
import BaseHelper from './-base.js';

var now = BaseHelper.extend({
  compute() {
    this._super(...arguments);
    const momentService = this.moment;
    return momentService.moment(momentOrMomentTimezone.now());
  }
});

export { now as default };
//# sourceMappingURL=now.js.map
