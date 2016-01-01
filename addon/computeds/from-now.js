import Ember from 'ember';
import moment from 'moment';

import getDependentKeys from '../utils/get-dependent-keys';
import getValue from '../utils/get-value';

const { computed } = Ember;

function fromNowComputed(...args) {
  const computedArgs = [].concat(getDependentKeys(args));

  computedArgs.push(function() {
    const momentArgs = args.map((arg) => getValue.call(this, arg));

    let maybeHideSuffix;

    if (momentArgs.length > 2) {
      maybeHideSuffix = momentArgs.pop();
    }

    return moment.apply(this, momentArgs).fromNow(maybeHideSuffix);
  });

  return computed.apply(this, computedArgs);
}

export default fromNowComputed;
