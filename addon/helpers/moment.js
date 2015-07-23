import moment from 'moment';

function momentHelper(params) {
  const length = params.length;
  const args = [];
  let output;

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

  return moment.apply(this, args).format(output);
}

export default momentHelper;
