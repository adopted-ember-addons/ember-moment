import { get } from '@ember/object';

import BaseHelper from './-base';

export default BaseHelper.extend({
  compute(params, { locale, timeZone }) {
    this._super(...arguments);

    const moment = get(this, 'moment');

    return this.morphMoment(moment.moment(...params), { locale, timeZone });
  }
});
