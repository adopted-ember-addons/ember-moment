import { get } from '@ember/object';
import moment from 'moment';

import BaseHelper from './-base';

export default BaseHelper.extend({
  compute([unixTimeStamp]) {
    this._super(...arguments);

    return get(this, 'moment').moment(moment.unix(unixTimeStamp));
  }
});
