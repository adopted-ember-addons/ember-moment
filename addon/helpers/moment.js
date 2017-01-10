import Ember from 'ember';
import BaseHelper from './-base';

export default BaseHelper.extend({
	moment: Ember.inject.service(),

  compute(params, { locale, timeZone }) {
    this._super(...arguments);

    const moment = this.get('moment');

    return this.morphMoment(moment.moment(...params), { locale, timeZone });
  }
});
