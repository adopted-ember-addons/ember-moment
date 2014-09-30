import Ember from 'ember';

function moment(value, maybeInput, maybeOutput) {
  var length = arguments.length;
  var input, output;

  if (length === 1) {
    throw new TypeError('Invalid Number of arguments, expected atleast 1');
  } else if (length === 2 ) {
    input = 'LLLL';
  } else if (length > 3) {
    input  = maybeInput;
    output = maybeOutput;
  }

  return window.moment(value, input).format(output);
}

export {
  moment
};

export default Ember.Handlebars.makeBoundHelper(moment);
