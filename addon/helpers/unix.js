import moment from 'moment';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute([unixTimeStamp]) {
    this._super(...arguments);
    
    return moment.unix(unixTimeStamp);
  }
});
