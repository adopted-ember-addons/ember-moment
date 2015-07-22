import Ember from 'ember';
import agoHelper from '../helpers/ago';
import momentHelper from '../helpers/moment';
import durationHelper from '../helpers/duration';

export default {
  name: 'ember-moment',
  initialize: function(container) {
    if (!Ember.HTMLBars) {
      throw new Error('HTMLBars is required with this version of ember-moment.');
    }

    let version = Ember.VERSION.split('.').slice(0,2).map(function(fragment) {
      return parseInt(fragment, 10);
    });

    if (version[0] === 1 && version[1] <= 12) {
      Ember.HTMLBars._registerHelper('ago', agoHelper);
      Ember.HTMLBars._registerHelper('moment', momentHelper);
      Ember.HTMLBars._registerHelper('duration', durationHelper);
    }
  }
}
