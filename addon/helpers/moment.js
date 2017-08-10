import { get } from '@ember/object';
import { inject as service } from '@ember/service';

import BaseHelper from './-base';

export default BaseHelper.extend({
	moment: service(),

  compute(params, { locale, timeZone }) {
    this._super(...arguments);

    const moment = get(this, 'moment');

    return this.morphMoment(moment.moment(...params), { locale, timeZone });
  }
});
