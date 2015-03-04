import moment from 'ember-moment/helpers/moment';
import ago from 'ember-moment/helpers/ago';
import duration from 'ember-moment/helpers/duration';
import Ember from 'ember';

export var initialize = function(/* container, app */) {
  var registerHelper;

  if (Ember.HTMLBars) {
    registerHelper = function (helperName, fn) {
      Ember.HTMLBars._registerHelper(helperName, Ember.HTMLBars.makeBoundHelper(fn));
    }
  } else {
    registerHelper = Ember.Handlebars.helper;
  };

  registerHelper('moment', moment);
  registerHelper('ago', ago);
  registerHelper('duration', duration);
};

export default {
  name: 'ember-moment',

  initialize: initialize
};
