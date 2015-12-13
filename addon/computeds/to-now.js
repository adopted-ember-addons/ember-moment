import Ember from 'ember';
import moment from 'moment';

import isDescriptor from '../utils/is-descriptor';

const { get, computed:emberComputed } = Ember;

export default function computedAgo(date, maybeInputFormat, maybeHidePrefix) {
  const args = [date];

  const computed = emberComputed(date, {
    get() {
      const momentArgs = [get(this, date)];

      if (arguments.length > 1) {
        const desc = isDescriptor.call(this, maybeInputFormat);
        const input = desc ? get(this, maybeInputFormat) : maybeInputFormat;

        if (desc && computed._dependentKeys.indexOf(maybeInputFormat) === -1) {
          computed.property(maybeInputFormat);
        }

        momentArgs.push(input);
      }

      return moment.apply(this, momentArgs).toNow(maybeHidePrefix);
    }
  });

  return computed.property.apply(computed, args).readOnly();
}
