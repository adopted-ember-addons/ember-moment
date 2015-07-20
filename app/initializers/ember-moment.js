import Ember from 'ember';
import momentHelper from 'ember-moment/helpers/moment';
import agoHelper from 'ember-moment/helpers/ago';
import durationHelper from 'ember-moment/helpers/duration';

export function initialize(registry) {
  let registerHelper;

  if (Ember.HTMLBars) {
    registerHelper = function(helperName, klass) {
      if (Ember.Helper && Ember.Helper.detect(klass)) {
        return registry.register(`helper:${helperName}`, klass);
      }
      return Ember.HTMLBars._registerHelper(helperName, Ember.HTMLBars.makeBoundHelper(klass));
    }
  } else {
    registerHelper = Ember.Handlebars.helper;
  }

  registerHelper('moment', momentHelper);
  registerHelper('ago', agoHelper);
  registerHelper('duration', durationHelper);
};

export default {
  name: 'ember-moment',
  initialize: initialize
};
