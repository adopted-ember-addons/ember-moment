import Ember from 'ember';
import IsAfterHelper from 'ember-moment/helpers/is-after';
import config from '../config/environment';

const { get } = Ember;

export default IsAfterHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
