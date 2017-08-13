import Ember from 'ember';
import FromHelper from 'ember-moment/helpers/moment-from';
import config from '../config/environment';

const { get } = Ember;

export default FromHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
