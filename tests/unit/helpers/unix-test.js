import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('unix', {
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
  }
});

test('returns the result of moment.unix', function(assert) {
  assert.expect(1);

  this.render(hbs`{{moment-format (unix 946684799) 'YYYYMMDD' timeZone='America/Los_Angeles'}}`);
  assert.equal(this.$().text(), '19991231');
});
