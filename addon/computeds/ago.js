import Ember from 'ember';
import moment from 'moment';
import isDescriptor from '../utils/is-descriptor';

let get = Ember.get;
let emberComputed = Ember.computed;

export default function computedAgo(date, maybeInputFormat) {
  let args = [date];

  let computed = emberComputed(date, function () {
    let momentArgs = [get(this, date)];

    if (arguments.length > 1) {
      let desc = isDescriptor(this[maybeInputFormat]);
      let input = desc ? get(this, maybeInputFormat) : maybeInputFormat;

      if (desc && computed._dependentKeys.indexOf(maybeInputFormat) === -1) {
        computed.property(maybeInputFormat);
      }

      momentArgs.push(input);
    }

    return moment.apply(this, momentArgs).fromNow();
  });

  return computed.property.apply(computed, args).readOnly();
}
