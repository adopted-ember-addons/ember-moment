# Ember-moment

[moment.js](http://momentjs.com) template helpers for ember [![Build Status](https://travis-ci.org/stefanpenner/ember-moment.svg?branch=master)](https://travis-ci.org/stefanpenner/ember-moment)

## Usage

* ember-cli < 0.2.3 `ember install:addon ember-moment`
* ember-cli >= 0.2.3 `ember install ember-moment`

```hbs
{{moment-format date}}
{{moment-ago date}}
{{moment-duration ms}}
```

advance

```hbs
{{moment-format date outputFormat inputFormat}}
{{moment-ago date inputFormat}}}
{{moment-duration number units}}
```

## Computed Macro

```js
import { momentFormat, momentAgo } from 'ember-moment/computed';

export default Ember.Controller.extend({
  date: new Date('2013-02-08T09:30:26'),
  shortDate: momentFormat('date', 'MM/DD/YYYY')
  timeSince: momentAgo('date', true)
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
