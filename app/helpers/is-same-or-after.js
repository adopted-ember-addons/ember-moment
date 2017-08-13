import Ember from 'ember';
import IsSameOrAfterHelper from 'ember-moment/helpers/is-same-or-after';
import config from '../config/environment';

const { get } = Ember;

export default IsSameOrAfterHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
