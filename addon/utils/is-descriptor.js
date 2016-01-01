// source: ember-cpm
// https://github.com/cibernox/ember-cpm/blob/7b974567c92e45a815ee18c6cb62e3ba1fa99f1d/addon/utils.js#L17-L20

import Ember from 'ember';

const { typeOf, meta } = Ember;

function isDescriptor(propertyName) {
  const metaObj = meta(this) || {};

  if (typeof propertyName === 'string' && metaObj.descs && metaObj.descs[propertyName]) {
    return true;
  }

  const prop = this[propertyName];

  return typeOf(prop) === 'object' && prop.isDescriptor;
}

export default isDescriptor;
