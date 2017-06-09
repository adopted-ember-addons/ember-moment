import hbs from 'htmlbars-inline-precompile';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('moment-diff', {
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
  }
});

test('two args with (dateA, dateB)', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().add(5, 'day')
  });

  this.render(hbs `{{moment-diff dateA dateB}}`);
  assert.equal(this.$().text(), '432000000');
});

test('two args with a moment and a string (dateMoment, dateString)', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateMoment: momentService.moment('2017-01-10'),
    dateString: '2017-01-15'
  });

  this.render(hbs `{{moment-diff dateMoment dateString}}`);
  assert.equal(this.$().text(), '432000000');
});

test('two args with (dateA, dateB) and expect a negative result', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().subtract(5, 'day')
  });

  this.render(hbs `{{moment-diff dateA dateB}}`);
  assert.equal(this.$().text(), '-432000000');
});

test('two args with precision (dateA, dateB, precision)', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().add(5, 'day')
  });

  this.render(hbs `{{moment-diff dateA dateB precision='day'}}`);
  assert.ok(this.$().text(), '5');
});

test('two args with precision and float (dateA, dateB, precision, float)', function(assert) {
  assert.expect(1);
  const momentService = this.container.lookup('service:moment');
  this.setProperties({
    dateA: new Date(),
    dateB: momentService.moment().add(6, 'month')
  });

  this.render(hbs `{{moment-diff dateA dateB precision='year' float=true}}`);
  assert.ok(this.$().text(), '.5');
});
