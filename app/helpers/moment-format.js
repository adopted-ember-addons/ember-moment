import Ember from 'ember';
import momentHelper from 'ember-moment/helpers/moment-format';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

export const computeFn = momentHelper(Ember.get(config, 'moment.outputFormat'));

export default makeBoundHelper(computeFn);
