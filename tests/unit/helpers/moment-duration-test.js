import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('moment-duration', {
  integration: true,
  beforeEach() {
    moment.locale('en');
  }
});

test('one arg (ms)', function(assert) {
  assert.expect(1);

  this.set('date', 86400000);
  this.render(hbs`{{moment-duration date}}`);
  assert.equal(this.$().text(), 'a day');
});

test('one arg (empty string)', function(assert) {
  assert.expect(1);

  this.set('date', '');
  this.render(hbs`{{moment-duration date}}`);
  assert.equal(this.$().text(), 'a few seconds');
});

test('one arg (object)', function(assert) {
  assert.expect(1);

  this.set('date', {
    seconds: 2,
    minutes: 2,
    hours: 2,
    days: 2,
    weeks: 2,
    months: 2,
    years: 2
  });

  this.render(hbs`{{moment-duration date}}`);
  assert.equal(this.$().text(), '2 years');
});

test('one arg (string)', function(assert) {
  assert.expect(1);

  this.set('date', '23:59:59');
  this.render(hbs`{{moment-duration date}}`);
  assert.equal(this.$().text(), 'a day');
});

test('two args (value, units) - minute', function(assert) {
  assert.expect(1);

  this.setProperties({
    unit: 'minutes',
    date: 1
  });

  this.render(hbs`{{moment-duration date unit}}`);

  assert.equal(this.$().text(), 'a minute');
});

test('two args (value, units) - day', function(assert) {
  assert.expect(1);

  this.setProperties({
    unit: 'day',
    date: 1
  });

  this.render(hbs`{{moment-duration date unit}}`);
  assert.equal(this.$().text(), 'a day');
});

test('two args (value, units) - empty value', function(assert) {
  assert.expect(1);

  this.setProperties({
    unit: 'minutes',
    date: null
  });

  this.render(hbs`{{moment-duration date unit}}`);
  assert.equal(this.$().text(), 'a few seconds');
});

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);

  this.set('date', 86400000);
  this.render(hbs`{{moment-duration date locale='es'}}`);
  assert.equal(this.$().text(), 'un día'); // note: that's not an `i` in día
});
