import Ember from 'ember';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  moment: Ember.inject.service(),
  globalAllowEmpty: false,

  compute: computeFn(function(params, { precision, locale, timeZone }) {
    this._super(...arguments);

    const moment = this.get('moment');
    const { length } = params;
    const args = [];
    const subtractionArgs = [];

    if (length === 1) {
      subtractionArgs.push(params[0]);
    } else if (length === 2 && Ember.typeOf(params[0]) === 'number' && Ember.typeOf(params[1]) === 'string') {
      subtractionArgs.push(...params);
    } else {
      args.push(params[0]);
      subtractionArgs.push(...params.slice(1));
    }

    return this.morphMoment(moment.moment(...args), { locale, timeZone }).subtract(...subtractionArgs, precision);
  })
});
