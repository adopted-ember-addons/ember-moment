import Ember from 'ember';
import moment from 'moment';

const { later:runLater } = Ember.run;

export var helperFactory = function(cb) {
  let toNow;

  if (Ember.Helper) {
    toNow = Ember.Helper.extend({
      compute: function(params, hash) {
        if (typeof cb === 'function') {
          cb();
        }
        if (params.length === 0) {
          throw new TypeError('Invalid Number of arguments, expected at least 1');
        }
        if (hash.interval) {
          runLater(this, this.recompute, parseInt(hash.interval, 10));
        }
        return moment.apply(this, params).toNow(hash.hidePrefix);
      }
    });
  }
  else {
    toNow = function(params, hash) {
      if (typeof cb === 'function') {
        cb();
      }
      if (params.length === 0) {
        throw new TypeError('Invalid Number of arguments, expected at least 1');
      }
      return moment.apply(this, params).toNow(hash.hidePrefix);
    };
  }
  return toNow;
};

export default helperFactory();
