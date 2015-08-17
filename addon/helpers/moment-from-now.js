import Ember from 'ember';
import moment from 'moment';
import computeFn from '../utils/compute-fn';

const runBind = Ember.run.bind;

export default function helperFactory(allowEmpty = false) {
  if (Ember.Helper) {
    return Ember.Helper.extend({
      compute: computeFn(allowEmpty, function(params, hash) {
        this.clearTimer();

        if (hash.interval) {
          this.timer = setTimeout(runBind(this, this.recompute), parseInt(hash.interval, 10));
        }

        let time = moment(...params);

        if (hash.locale) {
          time = time.locale(hash.locale);
        }

        return time.fromNow(hash.hideSuffix);
      }),
      clearTimer() {
        clearTimeout(this.timer);
      },
      destroy() {
        this.clearTimer();
        this._super(...arguments);
      }
    });
  }

  return computeFn(allowEmpty, function(params, hash) {
    let time = moment(...params);

    if (hash.locale) {
      time = time.locale(hash.locale);
    }

    return time.fromNow(hash.hideSuffix);
  });
}
