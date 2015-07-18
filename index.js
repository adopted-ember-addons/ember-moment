'use strict';

var path = require('path');

module.exports = {
  name: 'ember-moment',

  blueprintsPath: function blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },

  included: function included(app) {
    this._super.included(app);

    var options = app.options['ember-moment'] || {};
    app.import(path.join(app.bowerDirectory, 'moment', 'moment.js'));
    if (options.includeTimezone) {
      var timezonePath = [app.bowerDirectory, 'moment-timezone'];
      switch(options.includeTimezone) {
        case 'all':
          timezonePath.push('builds');
          timezonePath.push('moment-timezone-with-data.js');
          break;
        case '2010-2020':
          timezonePath.push('builds');
          timezonePath.push('moment-timezone-with-data-2010-2020.js');
          break;
        case 'none':
          timezonePath.push('moment-timezone.js');
          break;
        default:
          throw new Error("Ember Moment: Please specify the moment-timezone dataset to include as either 'all', '2010-2020', or 'none'.");
          break;
      }
      app.import(path.join.apply(undefined, timezonePath));
    }

    app.import(path.join(app.bowerDirectory, 'ember-cli-moment-shim', 'moment-shim.js'));
  }
};
