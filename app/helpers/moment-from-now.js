import helperFactory from 'ember-moment/helpers/moment-from-now';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

const { get } = Ember;

export const helper = helperFactory(!!get(config, 'moment.allowEmpty'));
export default makeBoundHelper(helper);
