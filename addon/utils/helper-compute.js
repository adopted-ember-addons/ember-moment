import Ember from 'ember';
import { isBlank } from '@ember/utils';
import { get } from '@ember/object';

// question unresolved https://github.com/ember-cli/ember-rfc176-data/issues/12#issuecomment-318603308
const { Logger: { warn } } = Ember;

export default function(cb) {
  return function(params, hash) {
    if (!params || params && params.length === 0) {
      throw new TypeError('ember-moment: Invalid Number of arguments, expected at least 1');
    }

    const datetime = params[0];

    let allowEmpty = hash.allowEmpty || hash['allow-empty'];

    if (allowEmpty === undefined || allowEmpty === null) {
      allowEmpty = get(this, 'globalAllowEmpty');
    }

    if (isBlank(datetime)) {
      if (allowEmpty) {
        return;
      }

      warn(`ember-moment: an empty value (null, undefined, or "") was passed to ember-moment helper`);
    }

    return cb.apply(this, arguments);
  };
}
