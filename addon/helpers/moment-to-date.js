import Ember from 'ember';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
	moment: Ember.inject.service(),

  globalAllowEmpty: false,

  compute: computeFn(function(params, { hidePrefix, locale, timeZone }) {
    this._super(...arguments);

    const moment = this.get('moment');

    return this.morphMoment(moment.moment(), { locale, timeZone }).to(...params, hidePrefix);
  })
});
