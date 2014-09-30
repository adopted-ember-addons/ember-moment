import { moment } from 'ember-moment/helpers/moment';
import { ago } from 'ember-moment/helpers/ago';

export var initialize = function(/* container, app */) {
  Ember.Handlebars.helper('moment', moment);
  Ember.Handlebars.helper('ago', ago);
};

export default {
  name: 'ember-moment',

  initialize: initialize
};
