import Ember from 'ember';
let { typeOf, Descriptor } = Ember;

// credit: https://github.com/cibernox/ember-cpm/blob/master/addon/utils.js#L17-L20
function isDescriptor(prop) {
  return typeOf(prop) === 'object' && (prop.constructor === Descriptor || // Ember < 1.11
     prop.isDescriptor); // Ember >= 1.11.0
}

export default isDescriptor;
