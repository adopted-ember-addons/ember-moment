import Ember from 'ember';
import moment from 'moment';
import MomentArguments from 'ember-moment/moment-arguments';

var duration;

function momentDuration (momentArgs) {
  var args = [momentArgs.value];

  if (typeof momentArgs.label !== 'undefined') {
    args.push(momentArgs.label);
  }

  return moment.duration.apply(this, args).humanize();
}

if (Ember.HTMLBars) {
  duration = function duration(params) {
    var length = params.length;

    if (length === 0 || length > 2) {
      throw new TypeError('Invalid Number of arguments, expected 1 or 2');
    }

    var momentArgs = params[0];

    if (!(momentArgs instanceof MomentArguments)) {
      var options = { value: params[0] };
      if (params[1]) {
        options.label = params[1];
      }
      momentArgs = new MomentArguments(options);
    }

    return momentDuration(momentArgs);
  };
} else {
  duration = function duration(value, label) {
    var length = arguments.length;

    if (length === 1 || length > 3) {
      // there's one extra argument that handlebars adds to the end,
      // which explains the difference in what we are checking and the error we are raising
      throw new TypeError('Invalid Number of arguments, expected 1 or 2');
    }

    var momentArgs = value;

    if (!(momentArgs instanceof MomentArguments)) {
      var options = { value: value };
      if (length === 3) {
        options.label = label;
      }
      momentArgs = new MomentArguments(options);
    }

    return momentDuration(momentArgs);
  };
}

export default duration;
