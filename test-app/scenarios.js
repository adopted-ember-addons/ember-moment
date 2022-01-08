const { Scenarios } = require('scenario-tester');
const { module: Qmodule, test } = require('qunit');

Scenarios.fromDir(__dirname)
  .expand({
    lts_3_16,
    lts_3_20,
    lts_3_24,
    lts_3_28,
    // release,
    // beta,
    // canary,
    // embroider,
  })
  .forEachScenario((scenario) => {
    Qmodule(scenario.name, function (hooks) {
      let app;

      hooks.before(async () => {
        app = await scenario.prepare();
      });

      test(`yarn test`, async function (assert) {
        let result = await app.execute('yarn test:ember');
        assert.equal(result.exitCode, 0, result.output);
      });
    });
  });

async function lts_3_16(project) {
  project.linkDevDependency('ember-cli', {
    baseDir: __dirname,
    resolveName: 'ember-cli-3.16',
  });
  project.linkDevDependency('ember-source', {
    baseDir: __dirname,
    resolveName: 'ember-source-3.16',
  });
}

async function lts_3_20(project) {
  project.linkDevDependency('ember-cli', {
    baseDir: __dirname,
    resolveName: 'ember-cli-3.20',
  });
  project.linkDevDependency('ember-source', {
    baseDir: __dirname,
    resolveName: 'ember-source-3.20',
  });
}

async function lts_3_24(project) {
  project.linkDevDependency('ember-cli', {
    baseDir: __dirname,
    resolveName: 'ember-cli-3.24',
  });
  project.linkDevDependency('ember-source', {
    baseDir: __dirname,
  });
}

async function lts_3_28(project) {
  project.linkDevDependency('ember-cli', {
    baseDir: __dirname,
    resolveName: 'ember-cli-3.28',
  });
  project.linkDevDependency('ember-source', {
    baseDir: __dirname,
    resolveName: 'ember-source-3.28',
  });
}

// async function release(project) {
//   project.linkDevDependency('ember-cli', {
//     baseDir: __dirname,
//     resolveName: 'ember-cli-latest',
//   });
//   project.linkDevDependency('ember-source', {
//     baseDir: __dirname,
//     resolveName: 'ember-source-latest',
//   });
// }

// async function beta(project) {
//   project.linkDevDependency('ember-cli', {
//     baseDir: __dirname,
//     resolveName: 'ember-cli-beta',
//   });
//   project.linkDevDependency('ember-source', {
//     baseDir: __dirname,
//     resolveName: 'ember-source-beta',
//   });
// }

// async function canary(project) {
//   project.linkDevDependency('ember-source', {
//     baseDir: __dirname,
//     resolveName: 'ember-source-canary',
//   });
// }

// async function embroider(project) {
//   project.linkDevDependency('@embroider/core', {
//     baseDir: __dirname,
//   });
//   project.linkDevDependency('@embroider/compat', {
//     baseDir: __dirname,
//   });
//   project.linkDevDependency('@embroider/webpack', {
//     baseDir: __dirname,
//   });
// }
