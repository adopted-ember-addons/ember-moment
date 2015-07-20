import Ember from 'ember';

let callHelper;

// Helpers receive different arguments in HTMLBars that it used to receive in
// Handlebars.
// This function calls the helper with the proper arguments depending on
// the configured template engine.
if (Ember.HTMLBars) {
  callHelper = function(helper, args) {
    let params = args.slice(0, -1);
    let context = args[args.length - 1];

    if (Ember.Helper && Ember.Helper.detect(helper)) {
      let instance = helper.create();
      return instance.compute(params, context);
    }

    return helper(params, context);
  };
} else {
  callHelper = function(helper, args) {
    return helper.apply(null, args);
  };
}

export default callHelper;
