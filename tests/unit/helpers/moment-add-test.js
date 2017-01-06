import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('moment-add',{
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
  }
});

test('one arg adds duration', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  const duration = { days: 3 };
  this.set('duration', duration);
  const expectedString = momentService.moment().add(duration).format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add duration}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});

test('two args with number and string', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  const number = 3;
  const precision = 'days';
  this.setProperties({
    number,
    precision
  });
  const expectedString = momentService.moment().add(number, precision).format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add number precision}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});

test('two args with date and duration', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  const duration = { days: 3 };
  this.set('duration', duration);
  const expectedString = momentService.moment('2016-06-01').add(duration).format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add '2016-06-01' duration}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});

test('one arg with precision', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  const number = 3;
  this.set('number', number);
  const expectedString = momentService.moment().add(number, 'days').format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add number precision='days'}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});

test('two args with precision', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  const number = 3;
  this.set('number', number);
  const expectedString = momentService.moment('2016-06-01').add(number, 'days').format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add '2016-06-01' number precision='days'}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});
