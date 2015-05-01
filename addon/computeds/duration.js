import Ember from 'ember';
import moment from 'moment';
import { descriptorFor } from './moment';

var get = Ember.get;
var emberComputed = Ember.computed;

export default function computedDuration(val, maybeUnits) {
  Ember.deprecate("ember-moment: Computed properties have been renamed from 'moment', 'ago', 'duration' to 'momentFormat', 'momentAgo' and 'momentDuration'");

  var numArgs = arguments.length;
  var args = [val];

  var computed = emberComputed(val, function () {
    var momentArgs, desc, input;

    momentArgs = [get(this, val)];

    if (numArgs > 1) {
      desc = descriptorFor.call(this, maybeUnits);
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
