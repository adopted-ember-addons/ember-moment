# ember-moment
[![npm Version][npm-badge]][npm]
[![Build Status](https://github.com/adopted-ember-addons/ember-moment/actions/workflows/ci.yml/badge.svg)](https://github.com/adopted-ember-addons/ember-moment/actions/workflows/ci.yml)
[![Ember Observer Score](http://emberobserver.com/badges/ember-moment.svg)](http://emberobserver.com/addons/ember-moment)

[moment.js](http://momentjs.com) template helpers for Ember.js

<!-- toc -->
- [Compatibility](#compatibility)
- [Using Moment.js in Ember Apps & Addons](#using-momentjs-in-ember-apps--addons)
- [Controlling Locale and Timezone Data](#controlling-locale-and-timezone-data)
- [Installing or Upgrading ember-moment](#installing-or-upgrading-ember-moment)
- [Usage](#usage)
- [Helpers](#helpers)
  - [moment](#moment)
  - [utc](#utc)
  - [moment-format](#moment-format)
  - [moment-from / moment-from-now](#moment-from--moment-from-now)
  - [moment-to / moment-to-now](#moment-to--moment-to-now)
  - [moment-duration](#moment-duration)
  - [moment-calendar](#moment-calendar)
  - [moment-diff](#moment-diff)
  - [moment-add](#moment-add)
  - [moment-subtract](#moment-subtract)
  - [is-before / is-after / is-same / is-same-or-before / is-same-or-after](#is-before--is-after--is-same--is-same-or-before--is-same-or-after)
  - [is-between](#is-between)
  - [now](#now)
  - [unix](#unix)
  - [Common optional named arguments](#common-optional-named-arguments)
- [Configuration Options](#configuration-options)
  - [Global Default Output Format](#global-default-output-format)
  - [Global Allow Empty Dates](#global-allow-empty-dates)
  - [Configure default runtime locale/timeZone](#configure-default-runtime-localetimezone)
    - [Globally set locale](#globally-set-locale)
    - [Globally set time zone](#globally-set-time-zone)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Contributing](#contributing)
- [Docs to add](#docs-to-add)
<!-- tocstop -->

## Compatibility

* Ember.js v3.16 or above
* Embroider or ember-auto-import 2.0

## Using Moment.js in Ember Apps & Addons

This addon provides Ember-specific Helpers and a Service that make it convenient to use Moment.js in your templates. If you just want to call Moment.js directly from Javascript, you don't need this addon.

The recommended way to use Moment.js in an Ember **app** is:

1. Add *either* `moment` or `moment-timezone` to your dependencies.
2. Make sure you have `ember-auto-import` in your dependencies.
3. Make sure you *don't* have `ember-cli-moment-shim` in your dependencies (it would add a redundant copy).
3. Use imports in your Javascript like `import moment from 'moment'` or `import moment from 'moment-timezone'`.
4. *Optional but strongly recommended*: Configure which locales and timezones will be included in your app by following the instructions below in "Controlling Locale and Timezone Data".

The recommended way to use Moment.js in an Ember **addon** is:

1. Add either `moment` or `moment-timezone` to your `peerDependencies`. This ensures that your addon and the app must use the same copy.
2. Also add it to your `devDependencies` so your own test suite satisfies the peerDep.
3. Make sure you *don't* depend on `ember-cli-moment-shim`.
4. Make sure you do depend on `ember-auto-import`.


Moment itself is no longer actively developed and new projects should not add it. You can look at alternative libraries like Luxon, or better yet keep an eye on [Temporal](https://github.com/tc39/proposal-temporal) which is likely to add moment-like capabilities directly to Javascript quite soon.

## Controlling Locale and Timezone Data

Apps should configure their locale and timezone support (which can have a large impact on bundle size) by following Moment's documentation about Webpack:

 - https://momentjs.com/docs/#/use-it/webpack/
 - https://momentjs.com/timezone/docs/#/use-it/webpack/

and passing the resulting webpack configuration to either ember-auto-import or Embroider.  For example:

```js
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      webpack: {
        plugins: [
          new MomentLocalesPlugin({
            // 'en' is built into moment and cannot be removed. This strips the others.
            localesToKeep: [], 
          }),

          new MomentTimezoneDataPlugin({
            // Keep timezone data for the US, covering all possible years.
            matchCountries: 'US',
          }),
        ],
      },
    },
  });
```



## Installing or Upgrading ember-moment

1. First, install Moment.js using the instructions above.
2. Then you can install ember-moment: `ember install ember-moment`

Compatibility:
  - Ember Octane+ : >= v9 // the [default](https://github.com/adopted-ember-addons/ember-moment/tree/master) branch
  - Ember Classic : &lt; v9 // the [ember-classic](https://github.com/adopted-ember-addons/ember-moment/tree/ember-classic) branch.

    the `ember-classic` branch is in maintenance mode, and will only receive bugfixes


## Usage

## Helpers

### moment

```hbs
{{moment <date>}}
```

| Parameters | Values |
| ---------- | ------ |
| `<date>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...)|

Returns a Moment.

**Example**

```hbs
{{moment '12-25-1995' 'MM-DD-YYYY'}} {{!-- Mon Dec 25 1995 00:00:00 GMT-0500 --}}
```

### utc

```hbs
{{utc <date>}}
{{utc}}
```


| Parameters | Values |
| ---------- | ------ |
| `<date>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/utc) by `moment` (a date `String` or a `Moment` or a `Date`...)|

Returns a Moment with [utc mode](http://momentjs.com/docs/#/parsing/utc/) set.

**Example**

```hbs
{{utc '2001-10-31T08:24:56'}} {{!-- Wed Oct 31 2001 08:24:56 GMT+0000 --}}
{{utc}} {{!-- current time utc, like Mon Feb 12 2018 20:33:08 GMT+0000 --}}
{{utc (moment '2018-01-01T00:00:00+01:00' 'YYYY-MM-DD HH:mm:ssZ')}}  {{!-- Sun Dec 31 2017 23:00:00 GMT+0000 --}}
```


### moment-format

```hbs
{{moment-format <date> [outputFormat=moment.defaultFormat [<inputFormat>]]}}
```

| Parameters | Values |
| ---------- | ------ |
| `<date>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `outputFormat` | An optional date/time `String` [output format](https://momentjs.com/docs/#/displaying/format/), defaults to `moment.defaultFormat` which you must [explicitly define](#global-default-output-format) |
| `<inputFormat>` | An optional date/time `String` [input format](https://momentjs.com/docs/#/parsing/string) |

Formats a `<date>` to an optional `outputFormat` from an optional `inputFormat`. If the `inputFormat` is not provided, the date `String` is parsed on a best effort basis. If the `outputFormat` is not given the global `moment.defaultFormat` is used. Typically, `outputFormat` and `inputFormat` are given. See [`momentjs#format`](https://momentjs.com/docs/#/displaying/format/).

*NOTE: for all other helpers, the input format string is the second argument.*

**Example**

```hbs
{{moment-format '12-1995-25' 'MM/DD/YYYY' 'MM-YYYY-DD'}} {{!-- 12/25/1995 --}}
```

### moment-from / moment-from-now

```hbs
{{moment-from <dateA> [<dateB>] [hideAffix=false]}}
{{moment-from-now <dateA> [hideAffix=false]}}
```

| Parameters | Values |
| ---------- | ------ |
| `<dateA>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `<dateB>` | An optional value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...), defaults to now |
| `hideAffix` | An optional `Boolean` to hide the relative prefix/suffix or not.  |

Returns the time between `<dateA>` and `<dateB>` relative to `<dateB>`. See [`momentjs#from`](https://momentjs.com/docs/#/displaying/from/).

*Note that `moment-from-now` is just a more verbose `moment-from` without `dateB`. You don't need to use it anymore.*

**Examples**

```hbs
{{!-- in January 2018 at time of writing --}}
{{moment-from '2995-12-25'}} {{!-- in 978 years --}}
{{moment-from-now '2995-12-25'}} {{!-- in 978 years --}}
{{moment-from '1995-12-25' '2995-12-25' hideAffix=true}} {{!-- 1000 years --}}
```

### moment-to / moment-to-now

```hbs
{{moment-to <dateA> [<dateB>] [hideAffix=false]}}
{{moment-to-now <dateA> [hideAffix=false]}}
```

| Parameters | Values |
| ---------- | ------ |
| `<dateA>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `<dateB>` | An optional value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...), defaults to now |
| `hideAffix` | An optional `Boolean` to hide the relative prefix/suffix or not.  |

Returns the time between `<dateA>` and `<dateB>` relative to `<dateA>`. See [`momentjs#to`](https://momentjs.com/docs/#/displaying/to/).

*Note that `moment-to-now` is just a more verbose `moment-to` without `dateB`. You don't need to use it anymore.*

**Examples**

```hbs
{{!-- in January 2018 at time of writing --}}
{{moment-to '2995-12-25'}} {{!-- 978 years ago --}}
{{moment-to '1995-12-25' '2995-12-25'}} {{!-- in 1000 years --}}
{{moment-to-now '1995-12-25' hideAffix=true}} {{!-- 22 years --}}
```

### moment-duration

```hbs
{{moment-duration <number> [<units>]}}
```

| Parameters | Values |
| ---------- | ------ |
| `<number>` | Any value(s) [interpretable as a duration](https://momentjs.com/docs/#/durations/creating) by `moment` (typically a `Number` in milliseconds)  |
| `<units>` | An optional `String` to specify the units of `<number>` (typically `'seconds'`, `'minutes'`, `'hours'`...) |

Returns a Duration automatically [humanized](https://momentjs.com/docs/#/durations/humanize). See [`momentjs#duration`](https://momentjs.com/docs/#/durations/creating/).

**Examples**

```hbs
{{moment-duration 100}} {{!-- a few seconds --}}
{{moment-duration 24 'hours'}} {{!-- a day --}}
```

### moment-calendar

```hbs
{{moment-calendar <dateA> [<dateB> [<formatHash>]]}}
```

| Parameters | Values |
| ---------- | ------ |
| `<dateA>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `<dateB>` | An optional value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) used as a reference, defaults to now |
| `<formatHash>` | An optional [output format hash](https://momentjs.com/docs/#/displaying/calendar-time), defaults to `{}` |

Returns the time between `<dateA>` and `<dateB>` relative to `<dateB>` in a way that is different from `moment-from` and customizable via `<formatHash>`. See [`momentjs#calendar`](https://momentjs.com/docs/#/displaying/calendar-time/).

**Examples**

```hbs
{{!-- in January 2018 at time of writing --}}
{{moment-from-now '2018-01-25'}} {{!-- 2 days ago --}}
{{moment-calendar '2018-01-25'}} {{!-- Yesterday at 12:00 AM --}}
```

### moment-diff

```hbs
{{moment-diff <dateA> <dateB> [precision='milliseconds' [float=false]]}}
```

| Parameters | Values |
| ---------- | ------ |
| `<dateA>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `<dateB>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `precision` | An optional [unit of measurement](https://momentjs.com/docs/#/displaying/difference), defaults to `'milliseconds'` |
| `float` | An optional `Boolean` to get the floating point result, rather than the integer value |

Returns the difference in `precision` units between `<dateA>` and `<dateB>` with floating point accuracy if `float` is `true`. See [`momentjs#diff`](https://momentjs.com/docs/#/displaying/difference/).

**Examples**

```hbs
{{moment-diff '2018-01-25' '2018-01-26'}} {{!-- 86400000 --}}
{{moment-diff '2018-01-25' '2018-01-26' precision='years' float=true}} {{!-- 0.0026881720430107525 --}}
```

### moment-add
```hbs
{{moment-add <date> <number> [precision='milliseconds']}}
```

| Parameters | Values |
| ---------- | ------ |
| `<date>` | An optional value [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...). Defaults to value of `moment()` |
| `<number>` | Any value(s) [interpretable as a duration](https://momentjs.com/docs/#/durations/creating) by `moment` that is the amount of the `precision` you want to `add` to the `date` provided |
| `precision` | An optional [unit of measurement](https://momentjs.com/docs/#/displaying/difference), defaults to `'milliseconds'` |

Mutates the original moment by adding time. See [`momentjs#add`](https://momentjs.com/docs/#/manipulating/add/).

**Examples**

```hbs
{{!-- Add 6 days to a date --}}
{{moment-add '10-19-2019' 6 precision='days'}}

{{!-- Add 6 days to a date --}}
const duration = { days: 6 }
{{moment-add '10-19-2019' duration}}

{{!-- Print a date 6 days from now --}}
{{moment-add 6 precision='days'}}
```

### moment-subtract
```hbs
{{moment-subtract <date> <number> [precision='milliseconds']}}
```

| Parameters | Values |
| ---------- | ------ |
| `<date>` | An optional value [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...). Defaults to value of `moment()` |
| `<number>` | Any value(s) [interpretable as a duration](https://momentjs.com/docs/#/durations/creating) by `moment` that is the amount of the `precision` you want to `subtract` from the `date` provided  |
| `precision` | An optional [unit of measurement](https://momentjs.com/docs/#/displaying/difference), defaults to `'milliseconds'` |

Mutates the original moment by removing time. See [`momentjs#subtract`](https://momentjs.com/docs/#/manipulating/subtract/).

**Examples**

```hbs
{{!-- Remove 6 days from a date --}}
{{moment-subtract '10-19-2019' 6 precision='days'}}

{{!-- Remove 6 days from a date --}}
const duration = { days: 6 }
{{moment-subtract '10-19-2019' duration}}

{{!-- Print a date 6 days earlier --}}
{{moment-subtract 6 precision='days'}}
```

### is-before / is-after / is-same / is-same-or-before / is-same-or-after

```hbs
{{is-before <dateA> [<dateB>] [precision='milliseconds']}}
{{is-after <dateA> [<dateB>] [precision='milliseconds']}}
{{is-same <dateA> [<dateB>] [precision='milliseconds']}}
{{is-same-or-before <dateA> [<dateB>] [precision='milliseconds']}}
{{is-same-or-after <dateA> [<dateB>] [precision='milliseconds']}}
```

| Parameters | Values |
| ---------- | ------ |
| `<dateA>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `<dateB>` | An optional value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...). If not given, `<dateA>` becomes now and `<dateB>` becomes `<dateA>` |
| `precision` | An optional `String` unit of comparison [precision](https://momentjs.com/docs/#/query/isBefore), defaults to `'milliseconds'` |

Returns a `Boolean` that indicates if `<dateA>` is respectively before/after/the same/same or before/ same or after `<dateB>` to the `precision` level. See [`momentjs#queries`](https://momentjs.com/docs/#/query/).

**Examples**

```hbs
{{is-before '2995-12-25'}} {{!-- false --}}
{{is-before '2018-01-25' '2018-01-26' precision='years'}} {{!-- false --}}
{{is-same-or-after '2018-01-25' '2018-01-26' precision='years'}} {{!-- true --}}
```

### is-between

```hbs
{{is-between <date> <dateA> [<dateB>] [precision='year' inclusivity='[)']}}
```

| Parameters | Values |
| ---------- | ------ |
| `<date>` | Any value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `<dateA>` | A boundary value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...) |
| `<dateB>` | An optional boundary value(s) [interpretable as a date/time](https://momentjs.com/docs/#/parsing/) by `moment` (a date `String` or a `Moment` or a `Date`...). If not given `<date>` is assigned now, `<dateA>` is assigned `<date>` and `<dateB>` is assigned `<dateA>`. |
| `precision` | An optional `String` unit of comparison [precision](https://momentjs.com/docs/#/query/is-between), defaults to `'milliseconds'` |
| `inclusivity` | An optional `String` indicating inclusivity of the boundaries, defaults to `()`|

Returns a `Boolean` that indicates if `<date>` is between `<dateA>` and `<dateB>` to the `precision` level and with boundary inclusions specified by `inclusivity`. See [`momentjs#is-between`](https://momentjs.com/docs/#/query/is-between).

**Examples**

```hbs
{{is-between '1995-12-25' '2995-12-25'}} {{!-- true --}}
{{is-between '1995-12-25' '1995-12-25' '2995-12-25' precision='years' inclusivity='()'}} {{!-- true --}}
```

### now

```hbs
{{now}}
{{moment-format (now) 'MM-DD-YYYY'}}
```

Returns the present Moment.

**Examples**

```hbs
{{!-- date at time of writing }}
{{now}} {{!-- Sat Jan 27 2018 11:59:31 GMT-0500 --}}
{{!-- interval is a common named parameter (see the corresponding section) }}
{{now interval=1000}} {{!-- <current date and updating every 1-second (1000 milliseconds).> --}}
```

### unix

```hbs
{{unix <timestamp>}}
```

| Parameters | Values |
| ---------- | ------ |
| `<timestamp>` | An integer `Number` or `String` value representing the number of seconds since the Unix Epoch (January 1 1970 12AM UTC)|

Returns a Moment corresponding to the `<timestamp>`.


**Examples**

```hbs
{{unix '1516586508'}} {{!-- Sun Jan 21 2018 21:01:48 GMT-0500 --}}
{{!-- Warning: Passing a literal integer value does not work --}}
{{unix 1516586508}} {{!-- Invalid date --}}
```

### Common optional named arguments

All helpers accept the following optional named arguments (even though they are not always applicable):

| Parameters | Values |
| ---------- | ------ |
| `locale` | An optional `String` [locale](https://momentjs.com/docs/#/i18n/), to override the default global `moment.locale` |
| `timeZone` | An optional `String` [time zone](https://momentjs.com/timezone/docs/), defaults to `moment.timeZone` (the default time zone) |
| `interval` | An optional interval `Number` of milliseconds when the helper should be recomputed |
| `allow-empty` | An optional `Boolean` to ignore the `Invalid date` output when knowingly passing `null`, `undefined`, or `''`, defaults to `false` |

**Note that `interval` does not recompute the value of the helper parameters, unless it is
part of a helper that *is* a value in which case it is useful for "live" updating as time elapses.**

*Warning: `allow-empty` is currently inconsistent and should not always be trusted.*

**Examples**

```hbs
{{now interval=1000}} {{!-- <current date and updating every 1-second (1000 milliseconds)> --}}
{{is-before (now) '2018-01-26' interval=60000}} {{!-- if this was true initially, it will always be true despite interval --}}
{{moment-format '' allow-empty=true}}  {{!-- <nothing> --}}
```

## Configuration Options

### Global Default Output Format

Your application may require a default format other than the default, ISO 8601.  For example, you may want dates to fallback on the localized shorthand format `L` by default.

```js
// config/environment.js
module.exports = function() {
  return {
    'ember-moment': {
      outputFormat: 'L'
    }
  }
};
```

If you need to change the default format during runtime, use the service API.  Doing so will cause the moment-format helper instances to re-render with the new default format.

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

If `null`, `undefined`, or an empty string are passed as a date to any of the moment helpers then you will get `Invalid Date` in the output.  To avoid this issue globally, you can set the option `allowEmpty` which all of the helpers respect and will result in nothing being rendered instead of `Invalid Date`.

```js
// config/environment.js
module.exports = function() {
  return {
    'ember-moment': {
      allowEmpty: true // default: false
    }
  }
};
```


### Configure default runtime locale/timeZone

#### Globally set locale

```js
// app/routes/applicaton.js
export default Ember.Route.extend({
  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setLocale('es');
  }
});
```

#### Globally set time zone

```js
// app/routes/applicaton.js
export default Ember.Route.extend({
  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setTimeZone('America/Los_Angeles');
  }
});
```

## Frequently Asked Questions

> `Invalid Date` is being rendered into the DOM, how do I avoid this?

An invalid date string is being passed into momentjs and/or the [input string format](https://momentjs.com/docs/#/parsing/string-format/) was omitted.

If you are knowingly passing null, undefined, or an empty string and want to ignore the output of `Invalid Date` then pass the option `allow-empty=true` to the helper (all helpers accept this property)

```hbs
{{moment-format ''}}  {{!-- Invalid date --}}
{{moment-format '' allow-empty=true}}  {{!-- <nothing> --}}
````

[npm]: https://www.npmjs.org/package/ember-moment
[npm-badge]: https://img.shields.io/npm/v/ember-moment.svg?style=flat-square

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## Docs to add
- [Development](#development)
- [Running Tests](#running-tests)
- [Building](#building)
