# Ember-moment
[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]

[moment.js](http://momentjs.com) template helpers for ember

## Requirements
* Ember >= 1.10
  * If you need support for < Ember 1.10 please use ember-moment 1.x-2.x
* HTMLBars

## Usage

* ember-cli < 0.2.3 `ember install:addon ember-moment`
* ember-cli >= 0.2.3 `ember install ember-moment`

```hbs
{{moment-format date}}
{{moment-from-now date}}
{{moment-duration ms}}
```

### Advance

```hbs
{{moment-format date outputFormat inputFormat}}
{{moment-from-now date inputFormat}}
{{moment-duration number units}}
```

Recomputes the time ago every 1-second.  This is useful for "live" updating as time elapses.

NOTE: This feature is only supported in Ember >= 1.13.0

```hbs
{{moment-from-now date interval=1000}}
```

## Upgrading

If your npm dep for ember-moment is not fixed on a version (ie, useing `~` or `^`) then you may be required to `ember g ember-moment` between versions as the default blueprint may have changed.

Please try this, along with clearing `node_modules` and `bower_components` before reporting issues after upgrades.

## ES6 Moment

This addon provides the ability to import moment as an ES6 module.
```js
import moment from 'moment';
```

## Computed Macro

```js
import momentDuration from 'ember-moment/computeds/duration';
import momentFormat from 'ember-moment/computeds/format';
import momentFromNow from 'ember-moment/computeds/from-now';

export default Ember.Controller.extend({
  date: new Date('2013-02-08T09:30:26'),

  // Takes on the behavior of moment().format()
  // http://momentjs.com/docs/#/displaying/format/
  shortDate: momentFormat('date', 'MM/DD/YYYY'),

  // second parameter is what is passed on to the `fromNow` function
  // in this case, `true` is used to display "ago"
  // http://momentjs.com/docs/#/displaying/fromnow/
  timeSince: momentFromNow('date', true),

  // duration units: seconds, minutes, hours, days, weeks, months, years
  // http://momentjs.com/docs/#/durations/
  computedNumHours: momentDuration(10, 'hours')
});
```

## Include Moment Timezone

You can optionally include the Moment Timezone package in your `config/environment.js` like so:

```js
// config.environment.js
module.exports = function(/* environment */) {
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

## i18n support

### Cherry pick locales (optimal)

```js
// config.environment.js
module.exports = function(environment) {
  return {
    moment: {
      // To cherry-pick specific locale support into your application.
      // Full list of locales: https://github.com/moment/moment/tree/2.10.3/locale
      includeLocales: ['es', 'fr-ca']
    }
  };
```

### Include all locales

```js
// config.environment.js
module.exports = function(environment) {
  return {
    moment: {
      includeLocales: true
    }
  };
```

### Configure default runtime locale

```js
// app/routes/applicaton.js
import moment from 'moment';

export default Ember.Route.extend({
  beforeModel() {
    // sets the application locale to Spanish
    moment.locale('es');
  }
});
```

Feature set of i18n support within moment can be found here:  http://momentjs.com/docs/#/i18n/

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
