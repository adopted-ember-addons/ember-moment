import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

import BaseHelper from './-base';

export default BaseHelper.extend({
	moment: service(),

  compute([unixTimeStamp]) {
    this._super(...arguments);

    const momentService = get(this, 'moment');
    return momentService.moment(moment.unix(unixTimeStamp));
  }
});
