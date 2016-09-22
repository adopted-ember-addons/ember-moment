import Ember from 'ember';
import moment from 'moment';
import getOwner from '../utils/get-owner';

import computedFactory from './-base';

const CONFIG_KEY = 'config:environment';
const { get } = Ember;

export default computedFactory(function formatComputed([value, optionalFormat]) {
  if (!optionalFormat) {
    const owner = getOwner(this);

    if (owner && owner.hasRegistration && owner.hasRegistration(CONFIG_KEY)) {
      const config = owner.resolveRegistration(CONFIG_KEY);

      if (config) {
        optionalFormat = get(config, 'moment.outputFormat');
      }
    }
  }

  return moment(value).format(optionalFormat);
});
