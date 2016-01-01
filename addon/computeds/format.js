import Ember from 'ember';
import moment from 'moment';
import getOwner from 'ember-getowner-polyfill';

import getDependentKeys from '../utils/get-dependent-keys';
import getValue from '../utils/get-value';

const CONFIG_KEY = 'config:environment';

const { get, assert, computed } = Ember;

function formatComputed(...args) {
  assert('At least one datetime argument required for moment computed', args.length);

  const computedArgs = [].concat(getDependentKeys(args));

  computedArgs.push(function() {
    const owner = getOwner(this);
    const propertyValues = args.map((arg) => getValue.call(this, arg));
    const momentArgs = [propertyValues[0]];

    let maybeOutputFormat = propertyValues[1];

    if (propertyValues.length > 2) {
      momentArgs.push(propertyValues[2]);
    }
    else if (owner && owner.hasRegistration && owner.hasRegistration(CONFIG_KEY)) {
      const config = owner.resolveRegistration(CONFIG_KEY);

      if (config) {
        maybeOutputFormat = get(config, 'moment.outputFormat');
      }
    }

    return moment.apply(this, momentArgs).format(maybeOutputFormat);
  });

  return computed.apply(this, computedArgs);
}

export default formatComputed;
