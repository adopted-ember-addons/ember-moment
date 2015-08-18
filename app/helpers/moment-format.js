import Ember from 'ember';
import momentFormatHelper from 'ember-moment/helpers/moment-format';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

const { get } = Ember;

export const helper = momentFormatHelper(get(config, 'moment.outputFormat'), !!get(config, 'moment.allowEmpty'));
export default makeBoundHelper(helper);
