import { get } from '@ember/object';
import moment from 'moment';

import BaseHelper from './-base';

export default BaseHelper.extend({

  compute([unixTimeStamp]) {
    this._super(...arguments);

    const momentService = get(this, 'moment');
    return momentService.moment(moment.unix(unixTimeStamp));
  }
});
