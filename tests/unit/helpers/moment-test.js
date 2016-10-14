import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

import date from '../../helpers/date';

moduleForComponent('moment', {
  integration: true,
  beforeEach() {
    moment.locale('en');
  }
});

test('', function(assert) {
  assert.expect(1);

  this.set('date', date(0));

  this.render(hbs`{{moment-format (moment date) 'MM-DD-YYYY'}}`);
  assert.equal(this.$().text(), '12-31-1969');
});
