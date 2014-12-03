import Ember from 'ember';
import momentjs from 'moment';

var moment;

if (Ember.HTMLBars) {
  moment = function moment(params) {
    var length = params.length;
    var args = [];
    var output;

    if (length === 0 || length > 3) {
      throw new TypeError('Invalid Number of arguments, expected at least 1 and at most 3');
    }

    args.push(params[0]);

    if (length === 1) {
      output = 'LLLL';
    } else if (length === 2) {
      output = params[1];
    } else if (length > 2) {
      args.push(params[2]);
      output = params[1];
    }

    return momentjs.apply(this, args).format(output);
  };
} else {
  moment = function moment(value, maybeOutput, maybeInput) {
    var length = arguments.length;
    var args = [];
    var output;

    if (length === 1 || length > 4) {
      // there's one extra argument that handlebars adds to the end,
      // which explains the difference in what we are checking and the error we are raising
      throw new TypeError('Invalid Number of arguments, expected at least 1 and at most 3');
    }

    args.push(value);

    if (length === 2) {
      output = 'LLLL';
    }
    else if (length === 3) {
      output = maybeOutput;
    } else if (length > 3) {
      args.push(maybeInput);
      output = maybeOutput;
    }

    return momentjs.apply(this, args).format(output);
  };
}

export default moment;
