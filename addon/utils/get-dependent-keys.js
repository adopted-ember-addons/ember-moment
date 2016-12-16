// source: ember-cpm
// https://github.com/cibernox/ember-cpm/blob/7b974567c92e45a815ee18c6cb62e3ba1fa99f1d/addon/utils.js#L49-L73

import Ember from 'ember';
import isDescriptor from './is-descriptor';

const { typeOf } = Ember;

function getDependentKeys(argumentArr) {
  return argumentArr.reduce((out, item) => {
    switch (typeOf(item)) {
      case 'string':
        const containsSpaces = item.indexOf(' ') !== -1;
        if (!containsSpaces) {
          out.push(item);
        }
        break;
      case 'boolean':
      case 'number':
        break;
      default:
        if (item && item._dependentKeys && isDescriptor(item)) {
          out = out.concat(item._dependentKeys);
        }
        break;
    }

    return out;
  }, []);
}

export default getDependentKeys;
