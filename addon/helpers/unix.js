import Ember from 'ember';
import moment from 'moment';
import BaseHelper from './-base';

export default BaseHelper.extend({
	moment: Ember.inject.service(),

  compute([unixTimeStamp]) {
    this._super(...arguments);
    
    const momentService = this.get('moment');
    return momentService.moment(moment.unix(unixTimeStamp));
  }
});
