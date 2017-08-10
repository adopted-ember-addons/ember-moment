import { get } from '@ember/object';
import { inject as service } from '@ember/service';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
	moment: service(),

  globalAllowEmpty: false,

  compute: computeFn(function(params, { hideSuffix, locale, timeZone }) {
    this._super(...arguments);

    const moment = get(this, 'moment');

    return this.morphMoment(moment.moment(...params), { locale, timeZone }).fromNow(hideSuffix);
  })
});
