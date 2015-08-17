import Ember from 'ember';
import momentFromNowHelper from 'ember-moment/helpers/moment-from-now';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

export const computeFn = momentFromNowHelper(Ember.get(config, 'moment.allowEmpty'));

export default makeBoundHelper(computeFn);
