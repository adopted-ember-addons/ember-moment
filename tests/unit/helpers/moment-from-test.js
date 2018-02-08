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

  const momentService = this.container.lookup('service:moment');

  this.set('date', momentService.moment().add(3, 'day'));

  this.render(hbs`{{moment-from date}}`);
  assert.equal(this.$().text(), 'in 3 days');
});

test('two args (dateA, dateB)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().add(3, 'day')
  });

  this.render(hbs`{{moment-from dateB dateA}}`);
  assert.equal(this.$().text(), 'in 3 days');
});

test('two args (dateA, dateB, hideAffix=boolean)', function(assert) {
  assert.expect(2);

  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().add(3, 'day')
  });

  this.render(hbs`{{moment-from dateB dateA hideAffix=true}}`);
  assert.equal(this.$().text(), '3 days');
  this.render(hbs`{{moment-from dateB dateA hideAffix=false}}`);
  assert.equal(this.$().text(), 'in 3 days');
});

test('three args (dateA, dateB, boolean)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().subtract(3, 'day')
  });

  this.render(hbs`{{moment-from dateA dateB true}}`);
  assert.equal(this.$().text(), '3 days');
});

test('can inline a locale', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  this.set('dateA', momentService.moment());
  this.set('dateB', momentService.moment().subtract(2, 'day'));

  this.render(hbs`{{moment-from dateA dateB locale='es'}}`);
  assert.equal(this.$().text(), 'en 2 días');
});
