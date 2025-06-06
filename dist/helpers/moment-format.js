import { isEmpty } from '@ember/utils';
import { observer, get } from '@ember/object';
import { c as computeFn } from '../helper-compute-DXymp0II.js';
import BaseHelper from './-base.js';

var momentFormat = BaseHelper.extend({
  // eslint-disable-next-line ember/no-observers
  defaultFormatDidChange: observer('moment.defaultFormat', function () {
    this.recompute();
  }),
  compute: computeFn(function (params, {
    locale,
    timeZone
  }) {
    this._super(...arguments);
    const moment = this.moment;
    const {
      length
    } = params;
    if (length > 3) {
      throw new TypeError('ember-moment: Invalid number of arguments, expected at most 3');
    }
    const args = [];
    const formatArgs = [];
    // eslint-disable-next-line ember/no-get
    const defaultFormat = get(this, 'moment.defaultFormat');
    args.push(params[0]);
    if (length === 1 && !isEmpty(defaultFormat)) {
      formatArgs.push(defaultFormat);
    } else if (length === 2) {
      formatArgs.push(params[1]);
    } else if (length > 2) {
      args.push(params[2]);
      formatArgs.push(params[1]);
    }
    return this.morphMoment(moment.moment(...args), {
      locale,
      timeZone
    }).format(...formatArgs);
  })
});

export { momentFormat as default };
//# sourceMappingURL=moment-format.js.map
