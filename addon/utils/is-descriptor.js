import Ember from 'ember';

const { typeOf } = Ember;

// credit: https://github.com/cibernox/ember-cpm/blob/master/addon/utils.js#L17-L20
function isDescriptor(propertyName) {
  const meta = Ember.meta(this);

  if (meta && meta.descs && meta.descs[propertyName]) {
    return true;
  }

  const prop = this[propertyName];
  return typeOf(prop) === 'object' && prop.isDescriptor;
}

export default isDescriptor;
