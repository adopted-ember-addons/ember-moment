import Ember from 'ember';
import moment from 'moment';

var ago;

if (Ember.HTMLBars) {
  ago = function ago(params) {
    if (params.length === 0) {
      throw new TypeError('Invalid Number of arguments, expected at least 1');
    }

    Ember.deprecate("ember-moment: Template helpers have been renamed from 'moment', 'ago', 'duration' to 'moment-format', 'moment-ago' and 'moment-duration'");
    return moment.apply(this, params).fromNow();
  };
} else {
  ago = function ago(value, maybeInput) {
    var length = arguments.length;
    var args = [value];

    if (length === 1) {
      throw new TypeError('Invalid Number of arguments, expected at least 1');
    } else if (length > 3) {
      args.push(maybeInput);
    }

    Ember.deprecate("ember-moment: Template helpers have been renamed from 'moment', 'ago', 'duration' to 'moment-format', 'moment-ago' and 'moment-duration'");
    return moment.apply(this, args).fromNow();
  };
}

export default ago;
