import Ember from 'ember';
import moment from 'moment';

const { later:runLater } = Ember.run;

export var helperFactory = function(cb) {
  if (Ember.Helper) {
    return Ember.Helper.extend({
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

        let time = moment(...params);
        if (hash.locale) {
          time = time.locale(hash.locale);
        }
        return time.toNow(hash.hidePrefix);
      }
    });
  }

  return function momentToNow(params, hash) {
    if (typeof cb === 'function') {
      cb();
    }
    if (params.length === 0) {
      throw new TypeError('Invalid Number of arguments, expected at least 1');
    }

    let time = moment(...params);
    if (hash.locale) {
      time = time.locale(hash.locale);
    }
    return time.toNow(hash.hidePrefix);
  };
};

export default helperFactory();
