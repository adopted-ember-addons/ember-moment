// source: ember-cpm
// https://github.com/cibernox/ember-cpm/blob/7b974567c92e45a815ee18c6cb62e3ba1fa99f1d/addon/utils.js#L17-L20

import Ember from 'ember';

const { typeOf, Descriptor } = Ember;

function isDescriptor(prop) {
  return typeOf(prop) === 'object' && (prop.constructor === Descriptor || // Ember < 1.11
     prop.isDescriptor); // Ember >= 1.11.0
}

export default isDescriptor;
