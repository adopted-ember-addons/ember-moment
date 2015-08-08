import moment from 'moment';

function durationHelper(params, hash) {
  if (params.length > 2) {
    throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
  }

  let time = moment.duration(...params);

  if (hash.locale) {
    time = time.locale(hash.locale);
  }

  return time.humanize();
}

export default durationHelper;
