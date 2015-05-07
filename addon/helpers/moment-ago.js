import Ember from 'ember';
import momentFormat from './moment-format';

var momentAgo;

if (Ember.HTMLBars) {
  momentAgo = function ago(params) {
    if (params.length === 0) {
      throw new TypeError('Invalid Number of arguments, expected at least 1');
    }

    return momentFormat.apply(this, params).fromNow();
  };
} else {
  momentAgo = function ago(value, maybeInput) {
    var length = arguments.length;
    var args = [value];

    if (length === 1) {
      throw new TypeError('Invalid Number of arguments, expected at least 1');
    } else if (length > 3) {
      args.push(maybeInput);
    }

    return momentFormat.apply(this, args).fromNow();
  };
}

export default momentAgo;
