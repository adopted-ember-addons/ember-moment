import Ember from 'ember';
import helperFactory from 'ember-moment/helpers/moment-from-now';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

const helper = helperFactory(!!Ember.get(config, 'moment.allowEmpty'));

export default makeBoundHelper(helper);
