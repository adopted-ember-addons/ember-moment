import Ember from 'ember';
import IsBetweenHelper from 'ember-moment/helpers/is-between';
import config from '../config/environment';

const { get } = Ember;

export default IsBetweenHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
