import Ember from 'ember';
import moment from 'moment';

export default Ember.Helper.extend({
  compute: function(params, { locale }) {
    if (!params || params && params.length > 2) {
      throw new TypeError('ember-moment: Invalid Number of arguments, at most 2');
    }

    let time = moment.duration(...params);

    if (locale) {
      time = time.locale(locale);
    }

    return time.humanize();
  }
});
