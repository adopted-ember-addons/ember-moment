import Ember from 'ember';
import moment from 'moment';

const { later:runLater } = Ember.run;

let ago;

function buildHelper(cb) {
  return function(params) {
    if (params.length === 0) {
      throw new TypeError('Invalid Number of arguments, expected at least 1');
    }
    if (typeof cb === 'function') {
      cb.apply(this, arguments);
    }
    return moment.apply(this, params).fromNow();
  };
}

if (Ember.Helper) {
  ago = Ember.Helper.extend({
    compute: buildHelper(function(params, hash) {
      if (hash.interval) {
        runLater(this, function() {
          this.recompute();
        }, hash.interval);
      }
    })
  });
}
else {
  ago = Ember.HTMLBars.makeBoundHelper(buildHelper());
}

export default ago;
