import { deprecate } from '@ember/application/deprecations';
import { get } from '@ember/object';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute: computeFn(function(params, { hidePrefix, hideAffix, locale, timeZone }) {
    deprecate(
      'hidePrefix is deprecated in favour of hideAffix',
      hidePrefix === undefined,  // display if this is false
      {id: 'ember-moment.addon.helpers.moment-to-now', until: '8.0.0'}
    );

    this._super(...arguments);

    const moment = get(this, 'moment');
    const hide = hidePrefix || hideAffix;
    return this.morphMoment(moment.moment(...params), { locale, timeZone }).toNow(hide);
  })
});
