import Ember from 'ember';
import CalendarHelper from 'ember-moment/helpers/moment-calendar';
import config from '../config/environment';

const { get } = Ember;

export default CalendarHelper.extend({
  globalAllowEmpty: !!get(config, 'moment.allowEmpty')
});
