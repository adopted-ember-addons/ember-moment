# Ember-moment
[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]

[moment.js](http://momentjs.com) template helpers and computed property macros for Ember

## Requirements
* Ember >= 1.10.0 (2.0-beta and canary also supported)
  * If you need support for < Ember 1.10 please use ember-moment 1.x-2.x

## Installing

### >= Ember 1.13.0
* ember-cli < 0.2.3 `ember install:addon ember-moment@4.0.0`
* ember-cli >= 0.2.3 `ember install ember-moment@4.0.0`

### < Ember 1.13.0
* ember-cli < 0.2.3 `ember install:addon ember-moment@3.6.4`
* ember-cli >= 0.2.3 `ember install ember-moment@3.6.4`

## Upgrading

It's advisable to run `ember g ember-moment` between upgrades as dependencies may have been added, removed, or upgraded between releases.  Please try this, along with clearing `node_modules` and `bower_components` before reporting issues after upgrading.

## Usage

```hbs
{{moment-format date}}
{{moment-from-now date}}
{{moment-to-now date}}
{{moment-duration ms}}
```

### Advanced Usage

```hbs
{{moment-format date outputFormat inputFormat}}
{{moment-from-now date}}
{{moment-to-now date}}
{{moment-duration number units}}
```

### Live Updating of Displayed Time

```hbs
{{moment-from-now date interval=1000}} // interval is in ms
```

Recomputes the time ago every 1-second (1000 milliseconds).  This is useful for "live" updating as time elapses.

*NOTE: This feature is only supported in Ember >= 1.13.0*


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
import momentToNow from 'ember-moment/computeds/to-now';

export default Ember.Controller.extend({
  date: new Date('2013-02-08T09:30:26'),

  // Takes on the behavior of moment().format()
  // http://momentjs.com/docs/#/displaying/format/
  shortDate: momentFormat('date', 'MM/DD/YYYY'),

  // first param: date input
  // second param: date format http://momentjs.com/docs/#/parsing/string-format/ (optional)
  // third param: hide suffix (optional, false by default)
  // http://momentjs.com/docs/#/displaying/fromnow/
  timeSince: momentFromNow("12-25-1995", "MM-DD-YYYY", false), // -> output: "2 years ago"

  // first param: date input
  // second param: date format http://momentjs.com/docs/#/parsing/string-format/ (optional)
  // third param: hide prefix (optional, false by default)
  // http://momentjs.com/docs/#/displaying/tonow
  computedNumHours: momentToNow("12-25-1995", "MM-DD-YYYY", false), // -> output: "in 20 years"

  // duration units: seconds, minutes, hours, days, weeks, months, years
  // http://momentjs.com/docs/#/durations/
  computedNumHours: momentDuration(10, 'hours')
});
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

Your application may require a different moment format default other than `LLLL`.  Your application may want dates to be treated in the shorthand date form `L` by default.

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

### Configure default runtime locale

#### Globally

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

#### Locally

All helpers except a `locale` argument, which is a string.  This allows for overriding of the global locale.

```hbs
{{moment-format date locale='es'}}
{{moment-duration date locale='es'}}
{{moment-from-now date locale='es'}}
{{moment-to-now date locale='es'}}
```

Feature set of i18n support within moment can be found here:  http://momentjs.com/docs/#/i18n/

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
