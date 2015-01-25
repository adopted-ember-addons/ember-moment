import Ember from 'ember';
import moment from 'moment';
import MomentArguments from 'ember-moment/moment-arguments';

var helper;

function momentHelper (momentArgs) {
  var args = [momentArgs.value];

  if (typeof momentArgs.inputFormat !== 'undefined') {
    args.push(momentArgs.inputFormat);
  }

  return moment.apply(this, args).format(momentArgs.outputFormat);
}

if (Ember.HTMLBars) {
  helper = function helper(params) {
    var args = params[0];

    if (!(args instanceof MomentArguments)) {
      var length = params.length;

      if (length === 0 || length > 3) {
        throw new TypeError('Invalid Number of arguments, expected at least 1 and at most 3');
      }

      var options = { value: params[0] };

      if (length === 2) {
        options.outputFormat = params[1];
      } else if (length > 2) {
        options.inputFormat  = params[2];
        options.outputFormat = params[1];
      }

      args = new MomentArguments(options);
    }

    return momentHelper(args);
  };
} else {
  helper = function helper(value, maybeOutput, maybeInput) {
    var args = value;

    if (!(args instanceof MomentArguments)) {
      var length  = arguments.length;
      var options = { value: value };

      if (length === 1 || length > 4) {
        // there's one extra argument that handlebars adds to the end,
        // which explains the difference in what we are checking and the error we are raising
        throw new TypeError('Invalid Number of arguments, expected at least 1 and at most 3');
      }

      if (length === 3) {
        options.outputFormat = maybeOutput;
      } else if (length > 3) {
        options.inputFormat = maybeInput;
        options.outputFormat = maybeOutput;
      }

      args = new MomentArguments(options);
    }

    return momentHelper(args);
  };
}

export default helper;
