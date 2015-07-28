import Ember from 'ember';
import isDescriptor from '../utils/is-descriptor';
import moment from 'moment';

const { computed, get, assert } = Ember;
const a_slice = Array.prototype.slice;

export default function computedMoment(date, outputFormat, maybeInputFormat) {
  assert('More than one argument passed into moment computed', arguments.length > 1);

  let args = a_slice.call(arguments);
  let result;
  args.shift();

  return result = computed(date, function () {
    let momentArgs = [get(this, date)];

    let propertyValues = args.map((arg) => {
      let desc = isDescriptor.call(this, arg);
      if (desc && result._dependentKeys.indexOf(arg) === -1) {
        result.property(arg);
      }

      return desc ? get(this, arg) : arg;
    });

    outputFormat = propertyValues[0];

    if (propertyValues.length > 1) {
      maybeInputFormat = propertyValues[1];
      momentArgs.push(maybeInputFormat);
    }

    return moment.apply(this, momentArgs).format(outputFormat);
  }).readOnly();
}
