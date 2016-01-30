import BaseHelper from './-base';

export default BaseHelper.extend({
  compute() {
    this._super(...arguments);

    return new Date();
  }
});
