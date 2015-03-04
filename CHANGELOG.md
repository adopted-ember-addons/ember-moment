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
