import moment from 'moment';

function durationHelper(params, { locale }) {
  if (params.length > 2) {
    throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
  }

  let time = moment.duration(...params);

  if (locale) {
    time = time.locale(locale);
  }

  return time.humanize();
}

export default durationHelper;
