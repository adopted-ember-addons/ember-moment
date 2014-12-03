import Ember from "ember";
var callHelper;

// Helpers receive different arguments in HTMLBars that it used to receive in
// Handlebars.
// This function calls the helper with the proper arguments depending on
// the configured template engine.
if (Ember.HTMLBars) {
  callHelper = function(helper, args) {
    var context = args[args.length - 1];
    return helper(args.slice(0, -1), context);
  };
} else {
  callHelper = function(helper, args) {
    return helper.apply(null, args);
  };
}

export default callHelper;
