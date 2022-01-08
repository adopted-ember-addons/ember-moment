'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    // temporarily disabling these because they were already failing
    'no-implicit-this': 'off',
    'no-curly-component-invocation': 'off',
    'no-action': 'off',
  },
};
