import Ember from 'ember';
import moment from 'moment';

var duration;

if (Ember.HTMLBars) {
  duration = function duration(params) {
    if (params.length !== 0) {
      throw new TypeError('Invalid Number of arguments, expected one argument');
    }

    return moment.duration(params).humanize();
  };
} else {
  duration = function duration(value) {
    return moment.duration(value).humanize();
  };
}

export default duration;
