import Ember from 'ember';
import moment from 'moment';
import getOwner from 'ember-getowner-polyfill';
import computed from './-base';

const CONFIG_KEY = 'config:environment';

const { get, assert } = Ember;

export default computed(function(params) {
  assert('At least one datetime argument required for moment computed', params.length);

  const owner = getOwner(this);
  const momentArgs = [params[0]];

  let maybeOutputFormat = params[1];

  if (params.length > 2) {
    momentArgs.push(params[2]);
  }
  else if (owner && owner.hasRegistration && owner.hasRegistration(CONFIG_KEY)) {
    const config = owner.resolveRegistration(CONFIG_KEY);

    if (config) {
      maybeOutputFormat = get(config, 'moment.outputFormat');
    }
  }

  return moment.apply(this, momentArgs).format(maybeOutputFormat);
});
