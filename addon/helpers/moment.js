import moment from 'moment';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute(params, { locale, timeZone }) {
    this._super(...arguments);

    return this.morphMoment(moment(...params), { locale, timeZone });
  }
});
