import Ember from 'ember';
import moment from 'moment';

function ago(value, maybeInput) {
  var length = arguments.length;
  var args = [value];

  if (length === 1) {
    throw new TypeError('Invalid Number of arguments, expected atleast 1');
  } else if (length > 3) {
    args.push(maybeInput);
  }

  return moment.apply(this, args).fromNow();
}

export {
  ago
};

export default Ember.Handlebars.makeBoundHelper(ago);
