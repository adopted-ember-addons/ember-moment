import Ember from 'ember';
import moment from 'moment';

export default Ember.Helper.extend({
  compute: function(params, hash) {
    if (params.length > 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
    }

    let time = moment.duration(...params);

    if (hash.locale) {
      time = time.locale(hash.locale);
    }

    return time.humanize();
  }
});
