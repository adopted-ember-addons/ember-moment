/* eslint-env node */
'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return this.addAddonToProject({ name: 'ember-cli-moment-shim', target: '^3.4.0' });
  }
};
