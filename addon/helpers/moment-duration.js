import moment from 'moment';
import Ember from 'ember';

import BaseHelper from './-base';

export default BaseHelper.extend({
	moment: Ember.inject.service(),

  disableInterval: true,

  compute(params, { locale, timeZone }) {
    this._super(...arguments);
    const momentService = this.get('moment');

    if (!params || params && params.length > 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
    }

    const result = momentService.moment(moment.duration(...params));
    return this.morphMoment(result._i, { locale, timeZone }).humanize();
  }
});
