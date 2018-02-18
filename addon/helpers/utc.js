import { get } from '@ember/object';
import moment from 'moment';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute([utcTime, format]) {
    this._super(...arguments);

    return get(this, 'moment').utc(moment.utc(utcTime, format));
  }
});
