import Ember from 'ember';

export default function(cb) {
  return function(params, hash) {
    if (!params || params && params.length === 0) {
      throw new TypeError('ember-moment: Invalid Number of arguments, expected at least 1');
    }

    const datetime = params[0];

    if ([null, '', undefined].indexOf(datetime) > -1 && (hash.allowEmpty || hash['allow-empty'])) {
      Ember.Logger.warn('ember-moment: an empty value (null, undefined, or '') was passed to moment-format');
      return;
    }

    return cb(...arguments);
  };
}
