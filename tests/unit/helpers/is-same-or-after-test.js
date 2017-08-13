import EmberObject from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('is-same-or-after',{
  integration: true
});

test('one arg (comparisonDate)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  const today = momentService.moment();
  const threeDaysFromNow = today.add(3, 'days');
  const context = EmberObject.create({
    date: threeDaysFromNow
  });
  this.set('context', context);

  this.render(hbs`{{is-same-or-after context.date}}`);
  assert.equal(this.$().text(), 'false');
});

test('one arg with precision (comparisonDate, precision)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  const today = momentService.moment();
  const threeYearsAgo = today.subtract(3, 'years');
  const context = EmberObject.create({
    date: threeYearsAgo
  });
  this.set('context', context);

  this.render(hbs`{{is-same-or-after context.date precision='year'}}`);
  assert.equal(this.$().text(), 'true');
});

test('two args (evaluatedDate, comparisonDate)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-same-or-after '2010-10-20' '2010-10-20'}}`);
  assert.equal(this.$().text(), 'true');
});

test('two args with precision (evaluatedDate, comparisonDate, precision)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-same-or-after '2010-12-20' '2010-10-19' precision='year'}}`);
  assert.equal(this.$().text(), 'true');
});

test('can be called with null when allow-empty is set to true', function(assert) {
  assert.expect(1);

  this.set('date', null);
  this.render(hbs`{{is-same-or-after null allow-empty=true}}`);
  assert.equal(this.$().text(), '');
});
