import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('unix', {
  integration: true,
  beforeEach() {
    moment.locale('en');
  }
});

test('returns the result of moment.unix', function(assert) {
  assert.expect(1);
  
  this.render(hbs`{{moment-format (unix 946684799) 'YYYYMMDD'}}`);
  assert.equal(this.$().text(), '19991231');
});
