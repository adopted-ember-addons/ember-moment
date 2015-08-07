import moment from 'moment';

function momentHelper(params, hash) {
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

  let time = moment(...args);
  if (hash.locale) {
    time = time.locale(hash.locale);
  }
  return time.format(output);
}

export default momentHelper;
