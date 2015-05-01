import Ember from 'ember';
import moment from 'moment';

var get = Ember.get;
var emberComputed = Ember.computed;
var EnumerableUtils = Ember.EnumerableUtils;
var a_slice = Array.prototype.slice;

export function descriptorFor(propertyName) {
  var meta = Ember.meta(this);

  if (meta && meta.descs) {
    return meta.descs[propertyName];
  }
}

export default function computedMoment(date, outputFormat, maybeInputFormat) {
  Ember.assert('More than one argument passed into moment computed', arguments.length > 1);

  var args = a_slice.call(arguments);
  var computed;

  args.shift();

  return computed = emberComputed(date, function () {
    var desc,
        self = this,
        momentArgs = [get(this, date)];

    var propertyValues = EnumerableUtils.map(args, function (arg) {
      desc = descriptorFor.call(self, arg);

      if (desc && computed._dependentKeys.indexOf(arg) === -1) {
        computed.property(arg);
      }

      return desc ? get(self, arg) : arg;
    });

    outputFormat = propertyValues[0];

    if (propertyValues.length > 1) {
      maybeInputFormat = propertyValues[1];
      momentArgs.push(maybeInputFormat);
    }

    return moment.apply(this, momentArgs).format(outputFormat);
  }).readOnly();
}
