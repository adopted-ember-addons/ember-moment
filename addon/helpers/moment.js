import moment from 'moment';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute(params) {
    this._super(...arguments);

    return moment(...params);
  }
});
