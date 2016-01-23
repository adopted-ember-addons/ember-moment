import Ember from 'ember';

import getValue from '../utils/get-value';
import getDependentKeys from '../utils/get-dependent-keys';

const { computed } = Ember;

export default function computedFactory(fn) {
  return function(...args) {
    const computedArgs = [].concat(getDependentKeys(args));

    computedArgs.push(function() {
      const params = args.map((arg) => getValue.call(this, arg));

      return fn.call(this, params);
    });

    return computed(...computedArgs);
  };
}
