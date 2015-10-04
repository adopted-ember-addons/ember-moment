import Ember from 'ember';
import moment from 'moment';

const { computed, defineProperty } = Ember;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    let locale = null;

    defineProperty(this, 'locale', computed({
      get() {
        return locale;
      },
      set(property, key) {
        locale = key;
        moment.locale(key);
        return key;
      }
    }));
  },

  moment() {
    let value = moment(...arguments);
    let locale = this.get('locale');

    if (locale) {
      value = moment.locale(locale);
    }

    return value;
  }
});
