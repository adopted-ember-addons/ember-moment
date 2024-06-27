import { momentOrMomentTimezone as moment } from '../index.js';
import BaseHelper from './-base.js';

export default BaseHelper.extend({
  compute() {
    this._super(...arguments);

    const momentService = this.moment;

    return momentService.moment(moment.now());
  },
});
