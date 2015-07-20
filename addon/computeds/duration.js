import Ember from 'ember';
import moment from 'moment';
import isDescriptor from '../utils/is-descriptor';

const { get, computed:emberComputed } = Ember;

export default function computedDuration(val, maybeUnits) {
  let numArgs = arguments.length;
  let args = [val];

  let computed = emberComputed(val, function () {
    let momentArgs, desc, input;

    momentArgs = [get(this, val)];

    if (numArgs > 1) {
      desc = isDescriptor(this[maybeUnits]);
      input = desc ? get(this, maybeUnits) : maybeUnits;

      if (desc && computed._dependentKeys.indexOf(maybeUnits) === -1) {
        computed.property(maybeUnits);
      }

      momentArgs.push(input);
    }

    return moment.duration.apply(this, momentArgs).humanize();
  });

  return computed.property.apply(computed, args).readOnly();
}
