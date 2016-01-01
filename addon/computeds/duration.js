import Ember from 'ember';
import moment from 'moment';

import getDependentKeys from '../utils/get-dependent-keys';
import getValue from '../utils/get-value';

const { computed } = Ember;

function durationComputed(...args) {
  const computedArgs = [].concat(getDependentKeys(args));

  computedArgs.push(function() {
    const momentArgs = args.map((arg) => getValue.call(this, arg));

    return moment.duration.apply(this, momentArgs).humanize();
  });

  return computed.apply(this, computedArgs);
}

export default durationComputed;
