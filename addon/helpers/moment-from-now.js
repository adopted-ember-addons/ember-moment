import Ember from 'ember';
import moment from 'moment';
import computeFn from '../utils/compute-fn';

const { later:runLater } = Ember.run;

export function helperFactory() {
  if (Ember.Helper) {
    return Ember.Helper.extend({
      compute: computeFn((params, hash) => {
        if (hash.interval) {
          runLater(this, this.recompute, parseInt(hash.interval, 10));
        }

        let time = moment(...params);
        if (hash.locale) {
          time = time.locale(hash.locale);
        }
        return time.fromNow(hash.hideSuffix);
      })
    });
  }

  return computeFn((params, hash) => {
    let time = moment(...params);
    if (hash.locale) {
      time = time.locale(hash.locale);
    }
    return time.fromNow(hash.hideSuffix);
  });
}

export default helperFactory();
