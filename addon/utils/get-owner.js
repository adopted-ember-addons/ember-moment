/* globals require */

import Ember from 'ember';

let getOwner = Ember.getOwner;

if (!getOwner) {
  try {
    getOwner = require('ember-getowner-polyfill')['default'];
  }
  catch(e) {
    Ember.Logger.warn('Ember.getOwner API unsupported.  To resolve this: `ember install ember-getowner-polyfill`');
  }
}

export default getOwner;
