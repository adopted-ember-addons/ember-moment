# Changelog

## Release (2025-06-06)

ember-moment 10.0.2 (patch)

#### :bug: Bug Fix
* `ember-moment`, `test-app-3.x`, `test-app-4.x`, `test-app-5.x`
  * [#415](https://github.com/adopted-ember-addons/ember-moment/pull/415) import service instead of inject from '@ember/service' ([@ZacharyMohler](https://github.com/ZacharyMohler))

#### Committers: 1
- Zachary Mohler ([@ZacharyMohler](https://github.com/ZacharyMohler))

## Release (2024-06-27)

ember-moment 10.0.1 (patch)

#### :memo: Documentation
* [#397](https://github.com/adopted-ember-addons/ember-moment/pull/397) Replace moment with 'ember-moment' ([@fsmanuel](https://github.com/fsmanuel))
* [#384](https://github.com/adopted-ember-addons/ember-moment/pull/384) Fix typo in moment-test ([@mayatron](https://github.com/mayatron))
* [#380](https://github.com/adopted-ember-addons/ember-moment/pull/380) chore(readme): update TOC ([@GreatWizard](https://github.com/GreatWizard))
* [#374](https://github.com/adopted-ember-addons/ember-moment/pull/374) Fix ToC link ([@ctjhoa](https://github.com/ctjhoa))

#### :house: Internal
* Other
  * [#413](https://github.com/adopted-ember-addons/ember-moment/pull/413) Recover `CHANGELOG.md` ([@mkszepp](https://github.com/mkszepp))
  * [#412](https://github.com/adopted-ember-addons/ember-moment/pull/412) Readd `repository` to root `package.json` ([@mkszepp](https://github.com/mkszepp))
  * [#404](https://github.com/adopted-ember-addons/ember-moment/pull/404) Setup release-plan ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#405](https://github.com/adopted-ember-addons/ember-moment/pull/405) Switch to pnpm ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#403](https://github.com/adopted-ember-addons/ember-moment/pull/403) Add `@ember/string` to devDependency ([@mkszepp](https://github.com/mkszepp))
  * [#402](https://github.com/adopted-ember-addons/ember-moment/pull/402) Update internally used node to 18.x ([@mkszepp](https://github.com/mkszepp))
* `ember-moment`
  * [#378](https://github.com/adopted-ember-addons/ember-moment/pull/378) Update dependency `@embroider/addon-shim` to `^1.8.9` ([@mkszepp](https://github.com/mkszepp))
* `ember-moment`, `test-app-3.x`
  * [#411](https://github.com/adopted-ember-addons/ember-moment/pull/411) Move to addon v2 blueprint ([@mkszepp](https://github.com/mkszepp))
* `test-app-3.x`, `test-app-4.x`, `test-app-5.x`
  * [#410](https://github.com/adopted-ember-addons/ember-moment/pull/410) Add `test-app` for each ember major version ([@mkszepp](https://github.com/mkszepp))

#### Committers: 6
- Camille TJHOA ([@ctjhoa](https://github.com/ctjhoa))
- Guillaume Gérard ([@GreatWizard](https://github.com/GreatWizard))
- Jeremy M. Taylor ([@mayatron](https://github.com/mayatron))
- Manuel Wiedenmann ([@fsmanuel](https://github.com/fsmanuel))
- Markus Sanin ([@mkszepp](https://github.com/mkszepp))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

### 10.0.0

 * [BREAKING] This addon no longer provides the `moment` library itself. Apps should depend directly on *either* `moment` or `moment-timezone` and import it via `ember-auto-import`. Apps should make sure to remove any dependencies on `ember-cli-moment-shim`. See "Using Moment in Ember Apps & Addons" in the README.
 * [BREAKING] This is a v2 addon so your app must have `ember-auto-import` >= 2.
 * [BREAKING] `includeTimezone`, `includeLocales`, and `localeOutputPath` options in `config/environment.js` are removed, since this addon is no longer responsible for providing `moment`. See "Controlling Locale and Timezone Data" in the README.

### 9.0.1

* @jfdnc fix error related to not having `defaultFormat` configured #363

### 9.0.0

* [BREAKING] drops support for Node 8 and 10
* [BREAKING] drops support for ember-source < 3.16

  If you need to use ember-moment with ember-source older than 3.16,
  you can still use ember-moment@v8.x -- there is a branch on GitHub,
  `ember-classic` that is still open for bugfixes and other updates, if
  folks need them.

  Currently supported ember-source versions (tested in CI) are:
    - 3.16
    - 3.20
    - 3.24

  Additionally, CI is also testing against ember-release/beta/canary
  as well as embroider-safe and embroider-optimized builds.

* [BREAKING] removed computed property macros

  Octane prefers vanillaJS:tm: getters over computed macros.

  For example, where you would previously have

  ```js
  @duration(...) myDuration
  ```

  you would now want:

  ```js
  get myDuration() {
    return moment.duration(...);
  }
  ```

* (internal): Migrate to GitHub Actions

### 8.0.0

* [BREAKING] drops Node 6 support
* Updates ember-macro-helpers to 4.x

### 7.8.1

* @puwelous Substitute merge() with assign() - Ember deprecation #296
* @jasonmit ci: Bump Supported Node version from 4 to 6.
* @kellyselden update ember-macro-helpers #285
* @scottkidder Replace Logger with console #281

### 7.7.0

* @fenekku deprecated hideSuffix/hidePrefix in favor of hideAffix
* @crotwell added utc helper & macro
*

### 7.6.0

* @kellyselden Fix invalid reexport for helpers/unix
* Upgrade ember-cli and dependencies

### 7.3.0

* Setting locale now sets locale on global moment object
* Added `setLocale` and `setTimeZone`.  Better naming.  Will continue to support `changeLocale` and `changeTimeZone` but have updated README to prefer new method names
* Added `localeChanged` and `timeZoneChanged` events
* @mfeltz scoped moment-subtract and moment-add to use the moment service `locale` property

### 7.2.0

* @kellyselden add back `ember-macro-helpers`

### 7.1.1

* Removed `ember-macro-helpers`

### 7.1.0

* @kellyselden ported computed macro factory to use computed macro utility methods from `ember-macro-helpers`

### 7.0.3

* Upgrade `ember-cli-moment-shim` to 3.0.0
* now helper now recomputes using setTimeout instead of run.later #205

### 7.0.2

* Revert upgrade `ember-cli-moment-shim` to 2.2.1 (moment.now issue)

### 7.0.1

* Upgrade `ember-cli-moment-shim` to 2.2.1

### 7.0.0

* Upgrade ember-cli-moment-shim to 1.3.0
* `now` helper returns `moment.now()` instead of `new Date()`
* Added `moment` helper
* Added `moment-calendar` helper
* @GarPit Added `moment-to-date` helper
* @stavarotti added `unix` helper
* @yads added `moment-subtract` `moment-add` helpers
* Removed `ember-getowner-polyfill` as a direct dep
* Add moment query helpers (`is-between`, `is-same-or-after`, `is-same-or-before`, `is-same`, `is-after`, `is-before`)
* BREAKING: no longer defaults moment-format to LLLL and instead uses the moment default format (ISO 8601)
  * Applications will need to specify the default format to LLLL if they want to keep this behavior: https://github.com/stefanpenner/ember-moment#global-default-output-format
* Adopted yarn

### 6.0.0

* [BREAKING] computed property macros can now support composition (https://github.com/stefanpenner/ember-moment/pull/139)

### 5.1.0

* Helper support for `moment().calendar();` (https://github.com/stefanpenner/ember-moment/pull/143)

### 5.0.2

* Prevent moment 2.11.0 from being installed due to it being unsupported

### 5.0.1

* Reduce size and complexity of computeds

### 5.0.0

* Rewrote computeds to support literals as arguments
* Do not warn on missing date when allowEmpty

### 4.2.1

* Remove `ember-new-computed`
* Remove use of an Ember global
* Remove need for instance initializer

### 4.2.0

* Upgrade `ember-cli-moment-shim`
* Add a `defaultFormat` property to the service, which `moment-format` helpers observer to recompute
* BUGFIX: `outputFormat` typo on `config/environment.js` lookup led to it never being properly looked up

### 4.1.0

* Adds support a `timeZone` argument on all helpers
* Adds a service which contains two methods: `changeLocale` and `changeTimeZone`
  * Invoking either of these methods will cause all helpers to rerender if a locale/timezone was not specified

### 4.0.1

* Removes two unused npm deps

### 4.0.0

* Removes support for legacy helpers
* Drops support for Ember < 1.13.0 (continue to use 3.x for < 1.13.0 support)

### 3.6.3-3.6.4

* Ember version detection incorrectly reported

### 3.6.2

* Warn on locale mismatch, silently ignore `en` locale since included by default in moment

### 3.6.1

* Bugfix global output format

### 3.6.0

* 2.0-beta + 2.0-canary supported again
* test support for deprecated helpers
* global allowEmpty configuration option
* removes unused helper modules from builds (slimmer dists)

### 3.5.1

* destroy interval timers on Helper destroy
* work around issue with Ember.run.next blocking test helpers

### 3.5.0

* Support for 2.0.0-beta and canary
* Upgrades dependencies

### 3.4.0

* Adds `allow-empty` argument to helpers to prevent Invalid Date to be rendered when passed an empty value (null, undefined, or "")

```hbs
{{moment-format date allow-empty=true}}
```

* Adds `locale` argument to helpers to locally scope locale format to specific helpers

```hbs
{{moment-format date locale='es'}}
```

* Adds a global output format string option to config/environment

```js
module.exports = function() {
  return {
    moment: {
      outputFormat: 'L' // overrides the `LLLL` that moment defaults to
    }
  }
};
```

### 3.3.0

* Adds toNow computed property macro
* Adds moment-to-now htmlbar helper
* Fixes documentation error around computed property macro argument order
* Adds the ability to hide the prefix/suffix from toNow/fromNow helpers and computed property macro output

### 3.2.1

* Removes deprecation warnings from Ember 1.13.6

### 3.2.0

* Deprecate helpers: `moment`, `ago`, `duration` in favor of `moment-format`, `moment-from-now`, `moment-duration`
* Deprecate computed property modules:
  * `ember-moment/computeds/ago` -> `ember-moment/computeds/from-now`
  * `ember-moment/computeds/moment` -> `ember-moment/computeds/format`
* Removed EnumerableUtils.map
* Updated ember-cli-moment-shim to 0.6.0
  * moment is now brought in via bower instead of npm (https://github.com/jasonmit/ember-cli-moment-shim/issues/14#issuecomment-125455255)

### 3.1.0

* Conditionally include all locales if `true` is passed to `includeLocales` option

### 3.0.2

* Smoke tests added
* Fixing regression which broke 1.10.0
* Added Ember 1.10.0 -> #release to the Travis CI matrix

### 3.0.1

* Fixes regression in <= 1.12.0 where the helpers are not registered properly

### 3.0.0

* Support to programmatically including moment i18n locale data via `includeLocales`
* Removes support for Ember.Handlebars.helpers in favor of just supporting HTMLBars going forward
* Removes `ember-moment/computed`.  Explicit full path import paths to avoid naming conflicts.
  * `ember-moment/computeds/duration`
  * `ember-moment/computeds/moment`
  * `ember-moment/computeds/from-now`

### 2.0.1

* Works around an issue within ember-cli with nested addon's that need to app.import
  * See: https://github.com/ember-cli/ember-cli/issues/3718

### 2.0.0

* 1.13.x support
* moment and moment timezone are now pulled in from `ember-cli-moment-shim` instead of `ember-moment`
* BREAKING: moved EmberApp's `ember-moment` configuration object to `config/environment.js` and renamed to `moment`.

```js
// config/environment.js
module.exports = function(environment) {
  return {
    moment: {
      includeTimezone: 'all'
    }
  }
}
```

### 1.1.1

* [BUGFIX] HTMLBars should use `makeBoundHelper`

### 1.1.0

* [ENHANCEMENT] HTMLBars support (backwards compat. with Handlebars)

* [ENHANCEMENT] Adding duration helper with examples in the dummy app

### 1.0.0

* [BREAKING ENHANCEMENT] The full `moment` Handlebars helper signature is now

      `{{moment-format date outputFormat inputFormat}}`

  to better reflect common usage pattern. You are usually passing a date as the first argument, which does not require specifying an inputFormat, and at the same time, you usually do want to specify an output format. [#12](https://github.com/stefanpenner/ember-moment/pull/12).

    Fixes case of passing both input and output formats, and changes default output format.

    Adds a few more usage examples to dummy app, and improves tests accordingly.

* [BUGFIX] Passing a two arguments to the `moment` helper was not handled properly.
* [ENHANCEMENT] Added more examples to the dummy app

### 0.2.0

Early versions, before this doc was maintained
