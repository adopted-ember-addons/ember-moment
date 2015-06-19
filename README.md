# Ember-moment

[moment.js](http://momentjs.com) template helpers for ember [![Build Status](https://travis-ci.org/stefanpenner/ember-moment.svg?branch=master)](https://travis-ci.org/stefanpenner/ember-moment)

## Usage

* ember-cli < 0.2.3 `ember install:addon ember-moment`
* ember-cli >= 0.2.3 `ember install ember-moment`

```hbs
{{moment date}}
{{ago date}}
{{duration ms}}
```

advance

```hbs
{{moment date outputFormat inputFormat}}
{{ago date inputFormat}}
{{duration number units}}
```

## Computed Macro

```js
import { moment, ago } from 'ember-moment/computed';

export default Ember.Controller.extend({
  date: new Date('2013-02-08T09:30:26'),
  shortDate: moment('date', 'MM/DD/YYYY')
  timeSince: ago('date', true)
});
```

## Include Moment Timezone

You can optionally include the Moment Timezone package in your `Brocfile.js` like so:

```js
var app = new EmberApp({
  'ember-moment': {
    // moment-timezone dataset to include.  Either 'all', '2010-2020', or 'none'.
    'includeTimezone': 'all'
  }
});
```

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
