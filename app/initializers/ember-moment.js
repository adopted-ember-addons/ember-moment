import moment from 'ember-moment/helpers/moment';
import ago from 'ember-moment/helpers/ago';
import duration from 'ember-moment/helpers/duration';
import Ember from 'ember';

export var initialize = function(/* container, app */) {
  var helper;
  
  if (Ember.HTMLBars) {
      helper = Ember.HTMLBars._registerHelper;
  } else {
      helper = Ember.Handlebars.helper;
  };
 
  helper('moment', moment);
  helper('ago', ago);
  helper('duration', duration);
};

export default {
  name: 'ember-moment',

  initialize: initialize
};
