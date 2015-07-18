import Ember from 'ember';
import momentHelper from 'ember-moment/helpers/moment';
import agoHelper from 'ember-moment/helpers/ago';
import durationHelper from 'ember-moment/helpers/duration';

export function initialize() {
  let registerHelper;

  if (Ember.HTMLBars) {
    registerHelper = function (helperName, fn) {
      Ember.HTMLBars._registerHelper(helperName, Ember.HTMLBars.makeBoundHelper(fn));
    }
  } else {
    registerHelper = Ember.Handlebars.helper;
  };

  registerHelper('moment', momentHelper);
  registerHelper('ago', agoHelper);
  registerHelper('duration', durationHelper);
};

export default {
  name: 'ember-moment',

  initialize: initialize
};
