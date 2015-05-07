import momentFormat from 'ember-moment/helpers/moment-format';
import momentAgo from 'ember-moment/helpers/moment-ago';
import momentDuration from 'ember-moment/helpers/moment-duration';
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

  registerHelper('moment-format', momentFormat);
  registerHelper('moment-ago', momentAgo);
  registerHelper('moment-duration', momentDuration);

  registerHelper('moment', momentFormat);
  registerHelper('ago', momentAgo);
  registerHelper('duration', momentDuration);
};

export default {
  name: 'ember-moment',

  initialize: initialize
};
