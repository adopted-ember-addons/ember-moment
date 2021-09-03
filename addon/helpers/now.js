import moment from 'moment';

import BaseHelper from './-base';

export default BaseHelper.extend({
  compute() {
    this._super(...arguments);

    const momentService = this.moment;

    return momentService.moment(moment.now());
  },
});
