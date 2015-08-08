import Ember from 'ember';
import emberComputed from 'ember-new-computed';
import moment from 'moment';
import isDescriptor from '../utils/is-descriptor';

const { get } = Ember;

function computedDuration(val, maybeUnits) {
  const numArgs = arguments.length;
  const args = [val];

  const computed = emberComputed(val, {
    get() {
      const momentArgs = [get(this, val)];

      if (numArgs > 1) {
        const desc = isDescriptor.call(this, maybeUnits);
        const input = desc ? get(this, maybeUnits) : maybeUnits;

        if (desc && computed._dependentKeys.indexOf(maybeUnits) === -1) {
          computed.property(maybeUnits);
        }

        momentArgs.push(input);
      }

      return moment.duration.apply(this, momentArgs).humanize();
    }
  });

  return computed.property.apply(computed, args);
}

export default computedDuration;
