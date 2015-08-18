import Ember from 'ember';
import momentToNowHelper from 'ember-moment/helpers/moment-to-now';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

export const computeFn = momentToNowHelper(Ember.get(config, 'moment.allowEmpty'));

export default makeBoundHelper(computeFn);
