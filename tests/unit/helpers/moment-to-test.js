import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('moment-to',{
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
  }
});

test('one arg (date)', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');

  this.set('date', momentService.moment().subtract(3, 'day'));

  this.render(hbs`{{moment-to date}}`);
  assert.equal(this.$().text(), 'in 3 days');
});

test('two args (dateA, dateB)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().subtract(3, 'day')
  });

  this.render(hbs`{{moment-to dateB dateA}}`);
  assert.equal(this.$().text(), 'in 3 days');
});

test('three args (dateA, dateB, boolean)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().add(3, 'day')
  });

  this.render(hbs`{{moment-to dateA dateB true}}`);
  assert.equal(this.$().text(), '3 days');
});

test('can inline a locale', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  this.set('dateA', momentService.moment());
  this.set('dateB', momentService.moment().add(2, 'day'));

  this.render(hbs`{{moment-to dateA dateB locale='es'}}`);
  assert.equal(this.$().text(), 'en 2 días');
});
