import Ember from 'ember';
import MomentArguments from 'ember-moment/moment-arguments';
import moment from 'moment';

var ago;

function momentAgo (momentArgs) {
  var args = [momentArgs.value];

  if (typeof momentArgs.inputFormat !== 'undefined') {
    args.push(momentArgs.inputFormat);
  }

  return moment.apply(this, args).fromNow();
}

if (Ember.HTMLBars) {
  ago = function ago(params) {
    if (params.length === 0) {
      throw new TypeError('Invalid Number of arguments, expected at least 1');
    }

    var momentArgs = params[0];

    if (!(momentArgs instanceof MomentArguments)) {
      var options = { value: params[0] };

      if (params.length > 1) {
        options.inputFormat = params[1];
      }

      momentArgs = new MomentArguments(options);
    }

    return momentAgo(momentArgs);
  };
} else {
  ago = function ago(value, maybeInput) {
    var momentArgs = value;

    if (!(momentArgs instanceof MomentArguments)) {
      var options = { value: value };
      var length = arguments.length;

      if (length === 1) {
        throw new TypeError('Invalid Number of arguments, expected at least 1');
      } else if (length > 3) {
        options.inputFormat = maybeInput;
      }

      momentArgs = new MomentArguments(options);
    }

    return momentAgo(momentArgs);
  };
}

export default ago;
