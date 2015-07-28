import Ember from 'ember';
import momentFromNowHelper from '../helpers/moment-from-now';
import momentFormatHelper from '../helpers/moment-format';
import momentDurationHelper from '../helpers/moment-duration';
import deprecatedMomentHelper from '../helpers/moment';
import deprecatedDurationHelper from '../helpers/duration';
import deprecatedAgoHelper from '../helpers/ago';

export function initialize(container) {
  if (!Ember.HTMLBars) {
    throw new Error('HTMLBars is required with this version of ember-moment.');
  }

  Ember.HTMLBars._registerHelper('moment-from-now', momentFromNowHelper);
  Ember.HTMLBars._registerHelper('moment-format', momentFormatHelper);
  Ember.HTMLBars._registerHelper('moment-duration', momentDurationHelper);

  // TODO: deprecated, remove below in 4.0.0
  Ember.HTMLBars._registerHelper('ago', deprecatedAgoHelper);
  Ember.HTMLBars._registerHelper('moment', deprecatedMomentHelper);
  Ember.HTMLBars._registerHelper('duration', deprecatedDurationHelper);
}

// This initializer is only included in applications that are <= Ember 1.12.0
// Otherwise, it is programmatically removed during the build process via `index.js` `treeForApp` method
export default {
  name: 'ember-moment',
  initialize: initialize
}
