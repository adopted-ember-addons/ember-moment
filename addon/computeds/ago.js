import Ember from 'ember';
import moment from 'moment';
import { descriptorFor } from './moment';

var get = Ember.get;
var emberComputed = Ember.computed;

export default function computedAgo(date, maybeInputFormat) {
  var args = [date];
  
  var computed = emberComputed(date, function () {
    var momentArgs, desc, input;
    momentArgs = [get(this, date)];

    if (arguments.length > 1) {
      desc = descriptorFor.call(this, maybeInputFormat);
      input = desc ? get(this, maybeInputFormat) : maybeInputFormat;

      if (desc && computed._dependentKeys.indexOf(maybeInputFormat) === -1) {
        computed.property(maybeInputFormat);
      }

      momentArgs.push(input);
    }

    return moment.apply(this, momentArgs).fromNow();
  });

  return computed.property.apply(computed, args).readOnly();
}
