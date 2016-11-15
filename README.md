# ember-moment
[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![Ember Observer Score](http://emberobserver.com/badges/ember-moment.svg)](http://emberobserver.com/addons/ember-moment)
[![Ember badge][ember-badge]][embadge]

[moment.js](http://momentjs.com) template helpers and computed property macros for Ember

## Requirements
* Ember >= 1.13.0
* Ember CLI

## Installing

* ember-cli >= 0.2.3 `ember install ember-moment`

## Upgrading

It's advisable to run `ember g ember-moment` between upgrades as dependencies may have been added, removed, or upgraded between releases.  Please try this, along with clearing `node_modules` and `bower_components` before reporting issues after upgrading.

## Usage

## Computed Property Macros

Ships with the following computed property macros: `duration`, `humanize`, `locale`, `tz`, `format`, `calendar`, `moment`, `toNow`, `fromNow`.  They can be used individually or composed together.

[Computed Property Macro Documentation](https://github.com/stefanpenner/ember-moment/wiki/Computed-Property-Macros)

## Helpers

```hbs
{{moment '12-25-1995' 'MM-DD-YYYY'}}
{{moment-format '12-25-1995' 'MM/DD/YYYY' 'MM-DD-YYYY'}} {{!-- outputFormat and inputFormat are optional --}}
{{moment-from-now (now) hideSuffix=true}} {{!-- hideSuffix is optional --}}
{{moment-to-now (unix timeStamp) date hidePrefix=true}} {{!-- hidePrefix is optional --}}
{{moment-duration number units}} {{!-- units is optional --}}
{{moment-calendar date referenceDate}} {{!-- reference date is optional --}}
{{is-before date comparison precision='year'}} {{!-- precision is optional --}}
{{is-after date comparison precision='year'}} {{!-- precision is optional --}}
{{is-same date comparison precision='year'}} {{!-- precision is optional --}}
{{is-same-or-before date comparison precision='year'}} {{!-- precision is optional --}}
{{is-same-or-after date comparison precision='year'}} {{!-- precision is optional --}}
{{is-between date comparisonA comparisonB precision='year' inclusivity='[)'}} {{!-- precision is optional, inclusivity optional  --}}
```

### Live Updating of Displayed Time

```hbs
{{moment-from-now (now) interval=1000}} // interval is in ms
```

Recomputes the time ago every 1-second (1000 milliseconds).  This is useful for "live" updating as time elapses.

## ES6 Moment

This addon provides the ability to import moment as an ES6 module.

```js
import moment from 'moment';
```

## Include Moment Timezone

You can optionally include the Moment Timezone package in your `config/environment.js` like so:

```js
// config/environment.js
module.exports = function() {
  return {
    moment: {
      // Options:
      // 'all' - all years, all timezones
      // '2010-2020' - 2010-2020, all timezones
      // 'none' - no data, just timezone API
      includeTimezone: 'all'
    }
  }
};
```

## Configuration Options

### Global Default Output Format

Your application may require a default format other than the default, ISO 8601.  For example, you may want dates to fallback on the localized shorthand format `L` by default.

```js
// config/environment.js
module.exports = function() {
  return {
    moment: {
      outputFormat: 'L'
    }
  }
};
```

If you need to change the default format during runtime, use the service API.  During so, will trigger the moment-format helper instances to re-render with the new default format.

```js
// app/controller/index.js
export default Ember.Controller.extend({
  moment: Ember.inject.service(),
  actions: {
    changeDefaultFormat() {
      this.set('moment.defaultFormat', 'MM.DD.YYYY');
    }
  }
})
```
### Global Allow Empty Dates

If `null`, `undefined`, or an empty string as a date to any of the moment helpers then you you will `Invalid Date` in the output.  To avoid this issue globally, you can set the option `allowEmpty` which all of the helpers respect and will result in nothing being rendered instead of `Invalid Date`.

```js
// config/environment.js
module.exports = function() {
  return {
    moment: {
      allowEmpty: true // default: false
    }
  }
};
```

### i18n support

#### Cherry pick locales (optimal)

```js
// config/environment.js
module.exports = function(environment) {
  return {
    moment: {
      // To cherry-pick specific locale support into your application.
      // Full list of locales: https://github.com/moment/moment/tree/2.10.3/locale
      includeLocales: ['es', 'fr-ca']
    }
  };
```

#### Include all locales into build

```js
// config/environment.js
module.exports = function(environment) {
  return {
    moment: {
      includeLocales: true
    }
  };
```

*NOTE: English is bundled automatically, not need to add `en` in `includeLocales`*

#### Write all the locales to a folder relative to `dist`

Alternatively, you can copy all of moment's locale files into your `dist` directory.

```js
// config.environment.js
module.exports = function(environment) {
  return {
    moment: {
      // This will output _all_ locale scripts to assets/moment-locales
      // this option does not respect includeLocales
      localeOutputPath: 'assets/moment-locales'
    }
  };
```

This allows you to load them on demand when you need them:

```js
Ember.$.getScript('/assets/moment-locales/fr.js');
```

### Configure default runtime locale/timeZone

#### Globally set locale

```js
// app/routes/applicaton.js
export default Ember.Route.extend({
  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').changeLocale('es');
  }
});
```

#### Globally set time zone

```js
// app/routes/applicaton.js
export default Ember.Route.extend({
  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').changeTimeZone('America/Los_Angeles');
  }
});
```

#### Inline Localization

All helpers accept a `locale` and `timeZone` argument, which is a string.  This allows for overriding of the global locale.

```hbs
{{moment-format date locale='es' timeZone='America/Los_Angeles'}}
{{moment-duration (now) date locale='es' timeZone='America/Los_Angeles'}}
{{moment-from-now (now) date locale='es' timeZone='America/Los_Angeles'}}
{{moment-to-now date locale='es' timeZone='America/Los_Angeles'}}
```

Documentation on i18n support within moment can be found here:  http://momentjs.com/docs/#/i18n/
Documentation on timezone within moment can be found here: http://momentjs.com/timezone/docs/

## Frequently Asked Questions

> `Invalid Date` is being rendered into the DOM, how do I avoid this?

An invalid date string is being passed into momentjs and/or the [input string format](http://momentjs.com/docs/#/parsing/string-format/) was omitted.  For example, if you're using the `moment-format` you'll pass the input format as the 3rd argument:

```hbs
{{moment-format date outputFormat inputFormat}}
```

*NOTE: for all other helpers, the input format string is the second argument.*

If you are knowingly passing null, undefined, or an empty string and want to ignore the output of `Invalid Date` then pass the option `allow-empty=true` to the helper (all helpers accept this property)

```hbs
{{moment-format date allow-empty=true}}
````

## Development

* `git clone` this repository
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

[npm]: https://www.npmjs.org/package/ember-moment
[npm-badge]: https://img.shields.io/npm/v/ember-moment.svg?style=flat-square
[travis]: https://travis-ci.org/stefanpenner/ember-moment
[travis-badge]: https://img.shields.io/travis/stefanpenner/ember-moment.svg?branch=master&style=flat-square
[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=1.13.0
