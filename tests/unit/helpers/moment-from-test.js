import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('moment-from',{
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
  }
});

test('one arg (date)', function(assert) {
  assert.expect(1);

  this.set('date', moment().add(3, 'day'));

  this.render(hbs`{{moment-from date}}`);
  assert.equal(this.$().text(), 'in 3 days');
});

test('two args (dateA, dateB)', function(assert) {
  assert.expect(1);

  this.setProperties({
    dateA: new Date(),
    dateB: moment().add(3, 'day')
  });

  this.render(hbs`{{moment-from dateB dateA}}`);
  assert.equal(this.$().text(), 'in 3 days');
});

test('three args (dateA, dateB, boolean)', function(assert) {
  assert.expect(1);

  this.setProperties({
    dateA: new Date(),
    dateB: moment().subtract(3, 'day')
  });

  this.render(hbs`{{moment-from dateA dateB true}}`);
  assert.equal(this.$().text(), '3 days');
});

test('can inline a locale', function(assert) {
  assert.expect(1);

  this.set('dateA', moment());
  this.set('dateB', moment().subtract(2, 'day'));

  this.render(hbs`{{moment-from dateA dateB locale='es'}}`);
  assert.equal(this.$().text(), 'en 2 días');
});
