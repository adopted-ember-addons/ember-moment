import Ember from 'ember';
import momentHelper from 'ember-moment/helpers/deprecated/moment';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

export const computeFn = momentHelper(Ember.get(config, 'moment.allowEmpty'));

export default makeBoundHelper(computeFn);
