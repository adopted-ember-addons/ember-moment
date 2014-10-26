import Ember from 'ember';
import momentjs from 'moment';

function moment(value, maybeOutput, maybeInput) {
  var length = arguments.length;
  var args = [];
  var output;

  if (length === 1) {
    throw new TypeError('Invalid Number of arguments, expected atleast 1');
  }

  args.push(value);

  if (length === 2) {
    args.push('LLLL');
  } else if (length > 3) {
    args.push(maybeInput);
    output = maybeOutput;
  }

  return momentjs.apply(this, args).format(output);
}

export {
  moment
};

export default Ember.Handlebars.makeBoundHelper(moment);
