import Ember from 'ember';
import deprecatedAgo from 'ember-moment/helpers/deprecated/ago';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

export const computeFn = deprecatedAgo(Ember.get(config, 'moment.allowEmpty'));

export default makeBoundHelper(computeFn);
