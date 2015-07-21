### 3.0.0

* Support to programmatically including moment i18n locale data via `includeLocales`
* Removes support for Ember.Handlebars.helpers in favor of just supporting HTMLBars going forward
* Removes `ember-moment/computed`.  Explicit full path import paths to avoid naming conflicts.
  * `ember-moment/computeds/duration`
  * `ember-moment/computeds/moment`
  * `ember-moment/computeds/ago`

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
  var ENV = {
    moment: {
      includeTimezone: 'all'
    }
  };
  return ENV;
```

### 1.1.1

* [BUGFIX] HTMLBars should use `makeBoundHelper`

### 1.1.0

* [ENHANCEMENT] HTMLBars support (backwards compat. with Handlebars)

* [ENHANCEMENT] Adding duration helper with examples in the dummy app

### 1.0.0

* [BREAKING ENHANCEMENT] The full `moment` Handlebars helper signature is now

      `{{moment date outputFormat inputFormat}}`

  to better reflect common usage pattern. You are usually passing a date as the first argument, which does not require specifying an inputFormat, and at the same time, you usually do want to specify an output format. [#12](https://github.com/stefanpenner/ember-moment/pull/12).

    Fixes case of passing both input and output formats, and changes default output format.

    Adds a few more usage examples to dummy app, and improves tests accordingly.

* [BUGFIX] Passing a two arguments to the `moment` helper was not handled properly.
* [ENHANCEMENT] Added more examples to the dummy app

### 0.2.0

Early versions, before this doc was maintained
