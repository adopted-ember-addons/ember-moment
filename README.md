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
{{moment date}}
{{ago date}}
{{duration ms}}
```

### Advance

```hbs
{{moment date outputFormat inputFormat}}
{{ago date inputFormat}}
{{duration number units}}
```

Recomputes the time ago every 1-second.  This is useful for "live" updating as time elapses.

NOTE: This feature is only supported in Ember >= 1.13.0

```hbs
{{ago date interval=1000}}
```

## ES6 Moment

This addon provides the ability to import moment as an ES6 module.
```js
import moment from 'moment';
```

## Computed Macro

```js
import computedDuration from 'ember-moment/computeds/duration';
import computedMoment from 'ember-moment/computeds/moment';
import computedAgo from 'ember-moment/computeds/ago';

export default Ember.Controller.extend({
  date: new Date('2013-02-08T09:30:26'),

  // Takes on the behavior of moment().format()
  // http://momentjs.com/docs/#/displaying/format/
  shortDate: computedMoment('date', 'MM/DD/YYYY'),

  // second parameter is what is passed on to the `fromNow` function
  // in this case, `true` is used to display "ago"
  // http://momentjs.com/docs/#/displaying/fromnow/
  timeSince: computedAgo('date', true),

  // duration units: seconds, minutes, hours, days, weeks, months, years
  // http://momentjs.com/docs/#/durations/
  computedNumHours: computedDuration(10, 'hours')
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

## Include moment locales for i18n support

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
