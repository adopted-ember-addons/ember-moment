import moment from 'moment';

function durationHelper(params, hash) {
  const length = params.length;

  if (length === 0 || length > 2) {
    throw new TypeError('ember-moment: Invalid Number of arguments, expected 1 or 2');
  }

  let time = moment.duration(...params);

  if (hash.locale) {
    time = time.locale(hash.locale);
  }

  return time.humanize();
}

export default durationHelper;
