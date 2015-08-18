import deprecatedAgo from 'ember-moment/helpers/deprecated/ago';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

export default makeBoundHelper(deprecatedAgo(!!Ember.get(config, 'moment.allowEmpty')));
