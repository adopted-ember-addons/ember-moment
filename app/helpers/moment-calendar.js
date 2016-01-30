import Ember from 'ember';
import config from '../config/environment';
import CalendarHelper from 'ember-moment/helpers/moment-calendar';

export default CalendarHelper.extend({
  globalAllowEmpty: !!Ember.get(config, 'moment.allowEmpty')
});
