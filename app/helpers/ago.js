import deprecatedAgo from 'ember-moment/helpers/deprecated/ago';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

const { get } = Ember;

export default makeBoundHelper(
  deprecatedAgo(
    !!get(config, 'moment.allowEmpty')
  )
);
