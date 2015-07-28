import moment from 'moment';

function durationHelper(params) {
  const length = params.length;

  if (length === 0 || length > 2) {
    throw new TypeError('Invalid Number of arguments, expected 1 or 2');
  }

  return moment.duration.apply(this, params).humanize();
}

export default durationHelper;
