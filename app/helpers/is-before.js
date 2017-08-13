import Ember from 'ember';
import IsBeforeHelper from 'ember-moment/helpers/is-before';
import config from '../config/environment';

const { get } = Ember;

export default IsBeforeHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
