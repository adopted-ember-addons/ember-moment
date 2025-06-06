import BaseHelper from './-base.js';
import { momentOrMomentTimezone } from '../index.js';

var momentDuration = BaseHelper.extend({
  compute(params, {
    locale,
    timeZone
  }) {
    this._super(...arguments);
    const momentService = this.moment;
    if (!params || params && params.length > 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
    }
    const result = momentService.moment(momentOrMomentTimezone.duration(...params));
    return this.morphMoment(result._i, {
      locale,
      timeZone
    }).humanize();
  }
});

export { momentDuration as default };
//# sourceMappingURL=moment-duration.js.map
