module.exports = {
  useYarn: true,
  scenarios: [
    {
      name: 'ember-lts-2.12',
      npm: {
        devDependencies: {
          'ember-source': '~2.12.0'
        }
      }
    },
    {
      name: 'ember-lts-2.16',
      npm: {
        devDependencies: {
          'ember-source': '~2.16.0'
        }
      }
    },
    {
      name: 'ember-lts-3.12',
      npm: {
        devDependencies: {
          'ember-source': '~3.12.0',
          'ember-cli-babel': '^7.0.0',
        }
      }
    },
    {
      name: 'ember-lts-3.16',
      npm: {
        devDependencies: {
          'ember-source': '~3.16.0',
          'ember-cli-babel': '^7.0.0',
        }
      }
    },
    {
      name: 'ember-lts-3.20',
      npm: {
        devDependencies: {
          'ember-source': '~3.20.0',
          'ember-cli-babel': '^7.0.0',
        }
      }
    },
    {
      name: 'ember-lts-3.24',
      npm: {
        devDependencies: {
          'ember-source': '~3.24.0',
          'ember-cli-babel': '^7.0.0',
        }
      }
    },
  ]
};
