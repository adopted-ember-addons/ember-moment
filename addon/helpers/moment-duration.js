import Ember from 'ember';
import momentFormat from './moment-format';

var momentDuration;

if (Ember.HTMLBars) {
  momentDuration = function duration(params) {
    var length = params.length;

    if (length === 0 || length > 2) {
      throw new TypeError('Invalid Number of arguments, expected 1 or 2');
    }

    return momentFormat.duration.apply(this, params).humanize();
  };
} else {
  momentDuration = function duration(arg1, arg2) {
    var length = arguments.length;

    if (length === 1 || length > 3) {
      // there's one extra argument that handlebars adds to the end,
      // which explains the difference in what we are checking and the error we are raising
      throw new TypeError('Invalid Number of arguments, expected 1 or 2');
    }

    var args = [arg1];

    if (length === 3) {
      args.push(arg2);
    }

    return momentFormat.duration.apply(this, args).humanize();
  };
}

export default momentDuration;
