'use strict';

var path = require('path');

module.exports = {
  name: 'ember-moment',

  blueprintsPath: function blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },

  included: function included(app) {
    this.app = app;
    var options = app.options['ember-moment'] || {};

    this._super.included(app);

    app.import(app.bowerDirectory + '/moment/moment.js');

    if (options.includeTimezone) {
      var timezonePath = "/moment-timezone/";
      switch(options.includeTimezone) {
        case 'all':
          timezonePath += 'builds/moment-timezone-with-data';
          break;
        case '2010-2020':
          timezonePath += 'builds/moment-timezone-with-data-2010-2020';
          break;
        case 'none':
          timezonePath += 'moment-timezone';
          break;
        default:
          throw new Error("Ember Moment: Please specify the moment-timezone dataset to include as either 'all', '2010-2020', or 'none'.");
          break;
      }
      app.import(app.bowerDirectory + timezonePath + '.js');
    }

    app.import(app.bowerDirectory + '/ember-cli-moment-shim/moment-shim.js', {
      exports: {
        moment: ['default']
      }
    });
  }
};
