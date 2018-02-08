import { deprecate } from '@ember/application/deprecations';
import { get } from '@ember/object';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute: computeFn(function(params, { hideSuffix, hideAffix, locale, timeZone }) {
    deprecate(
      'hideSuffix is deprecated in favour of hideAffix',
      hideSuffix === undefined,  // display if this is false
      {id: 'ember-moment.addon.helpers.moment-from-now', until: '8.0.0'}
    );

    this._super(...arguments);

    const moment = get(this, 'moment');
    const hide = hideSuffix || hideAffix;
    return this.morphMoment(moment.moment(...params), { locale, timeZone }).fromNow(hide);
  })
});
