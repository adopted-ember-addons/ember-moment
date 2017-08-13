import { get } from '@ember/object';
import { getOwner } from '@ember/application';
import moment from 'moment';

import computedFactory from './-base';

const CONFIG_KEY = 'config:environment';

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
