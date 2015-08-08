import Ember from 'ember';
import moment from 'moment';
import computeFn from '../utils/compute-fn';

const { later:runLater } = Ember.run;

export function helperFactory() {
  if (Ember.Helper) {
    return Ember.Helper.extend({
      compute: computeFn(function(params, hash) {
        if (hash.interval) {
          runLater(this, this.recompute, parseInt(hash.interval, 10));
        }

        let time = moment(...params);
        if (hash.locale) {
          time = time.locale(hash.locale);
        }
        return time.toNow(hash.hidePrefix);
      })
    });
  }

  return computeFn(function(params, hash) {
    let time = moment(...params);
    if (hash.locale) {
      time = time.locale(hash.locale);
    }
    return time.toNow(hash.hidePrefix);
  });
}

export default helperFactory();
