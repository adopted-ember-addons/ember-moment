import moment from 'moment';
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
  const duration = { days: 3 };
  this.set('duration', duration);
  const expectedString = moment().add(duration).format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add duration}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});

test('two args with number and string', function(assert) {
  assert.expect(1);
  const number = 3;
  const precision = 'days';
  this.setProperties({
    number,
    precision
  });
  const expectedString = moment().add(number, precision).format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add number precision}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});

test('two args with date and duration', function(assert) {
  assert.expect(1);
  const duration = { days: 3 };
  this.set('duration', duration);
  const expectedString = moment('2016-06-01').add(duration).format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add '2016-06-01' duration}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});

test('one arg with precision', function(assert) {
  assert.expect(1);
  const number = 3;
  this.set('number', number);
  const expectedString = moment().add(number, 'days').format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add number precision='days'}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});

test('two args with precision', function(assert) {
  assert.expect(1);
  const number = 3;
  this.set('number', number);
  const expectedString = moment('2016-06-01').add(number, 'days').format('ddd MMM DD YYYY');

  this.render(hbs`{{moment-add '2016-06-01' number precision='days'}}`);
  assert.ok(this.$().text().match(new RegExp(expectedString)));
});
