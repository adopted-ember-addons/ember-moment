'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-moment'],
    },
  });

  return maybeEmbroider(app, {
    packageRules: [
      {
        package: 'test-app-3.x',
        // Pre-strict mode, helpers and components are ambiguous
        helpers: {
          '{{get-format}}': { safeToIgnore: true },
        },
      },
    ],
    skipBabel: [
      {
        package: 'qunit',
      },
      {
        package: 'moment',
      },
      {
        package: 'moment-timezone',
      },
    ],
  });
};
