import computedUnsafe from 'ember-macro-helpers/computed-unsafe';

export default function computedFactory(fn) {
  return function(...args) {
    args.push(function(...vals) {
      return fn.call(this, vals);
    });

    return computedUnsafe(...args);
  };
}
