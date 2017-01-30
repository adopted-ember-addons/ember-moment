import computedUnsafe from 'ember-macro-helpers/computed-unsafe';

export default function computedFactory(fn) {
  return function(...args) {
    return computedUnsafe(...args, function(...vals) {
      return fn.call(this, vals);
    });
  };
}
