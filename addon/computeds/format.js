import Ember from 'ember';
import moment from 'moment';

import isDescriptor from '../utils/is-descriptor';

const { get, assert, computed:emberComputed } = Ember;
const a_slice = Array.prototype.slice;

function computedFormat(date, maybeOutputFormat, maybeInputFormat) {
  assert('At least one datetime argument required for moment computed', arguments.length);

  const args = a_slice.call(arguments);
  let result;
  args.shift();

  return result = emberComputed(date, {
    get() {
      const momentArgs = [get(this, date)];

      const propertyValues = args.map((arg) => {
        const desc = isDescriptor.call(this, arg);
        if (desc && result._dependentKeys.indexOf(arg) === -1) {
          result.property(arg);
        }

        return desc ? get(this, arg) : arg;
      });

      if (propertyValues.length) {
        maybeOutputFormat = propertyValues[0];

        if (propertyValues.length > 1) {
          maybeInputFormat = propertyValues[1];
          momentArgs.push(maybeInputFormat);
        }
      }
      else if (this.container) {
        const config = this.container.lookupFactory('config:environment');
        maybeOutputFormat = get(config, 'moment.outputFormat');
      }

      return moment.apply(this, momentArgs).format(maybeOutputFormat);
    }
  });
}

export default computedFormat;
