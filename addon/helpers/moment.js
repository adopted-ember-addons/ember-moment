import Ember from 'ember';
import moment from 'moment';

export default Ember.Helper.extend({
  compute(params) {
    return moment(...params);
  }
});
