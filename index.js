'use strict';

var path = require('path');

module.exports = {
  name: 'ember-moment',

  blueprintsPath: function blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },

  included: function included(app) {
    this.app = app;

    this._super.included(app);

    app.import(app.bowerDirectory + '/moment/moment.js');

    app.import(app.bowerDirectory + '/ember-cli-moment-shim/moment-shim.js', {
      exports: {
        moment: ['default']
      }
    });
  }
};
