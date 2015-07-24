import Ember from 'ember';
import agoHelper from '../helpers/ago';
import momentHelper from '../helpers/moment';
import durationHelper from '../helpers/duration';

export function initialize(container) {
  if (!Ember.HTMLBars) {
    throw new Error('HTMLBars is required with this version of ember-moment.');
  }

  Ember.HTMLBars._registerHelper('ago', agoHelper);
  Ember.HTMLBars._registerHelper('moment', momentHelper);
  Ember.HTMLBars._registerHelper('duration', durationHelper);
}

// This initializer is only included in applications that are <= Ember 1.12.0
// Otherwise, it is programmatically removed during the build process via `index.js` `treeForApp` method
export default {
  name: 'ember-moment',
  initialize: initialize
}
