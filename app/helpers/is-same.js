import Ember from 'ember';
import IsSameHelper from 'ember-moment/helpers/is-same';
import config from '../config/environment';

const { get } = Ember;

export default IsSameHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
