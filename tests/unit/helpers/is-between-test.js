import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('is-between',{
  integration: true
});

test('two args (comparisonDate1, comparisonDate2)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  const today = momentService.moment();
  const threeDaysFromNow = today.add(3, 'days');
  const context = Ember.Object.create({
    date: threeDaysFromNow
  });
  this.set('context', context);

  this.render(hbs`{{is-between '2010-10-19' context.date}}`);
  assert.equal(this.$().text(), 'true');
});

test('two args (comparisonDate1, comparisonDate2, precision)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  const today = momentService.moment();
  const threeYearsFromNow = today.add(3, 'years');
  const context = Ember.Object.create({
    date: threeYearsFromNow
  });
  this.set('context', context);

  this.render(hbs`{{is-between '2010-10-19' context.date precision='year'}}`);
  assert.equal(this.$().text(), 'true');
});

test('two args (comparisonDate1, comparisonDate2, precision, inclusivity)', function(assert) {
  assert.expect(1);

  const momentService = this.container.lookup('service:moment');
  const today = momentService.moment();
  const threeDaysFromNow = today.add(3, 'days');
  const context = Ember.Object.create({
    date: threeDaysFromNow
  });
  this.set('context', context);

  this.render(hbs`{{is-between '2010-10-19' context.date precision='year' inclusivity='()'}}`);
  assert.equal(this.$().text(), 'false');
});

test('three args (evaluatedDate, comparisonDate1, comparisonDate2)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-between '2010-10-20' '2010-10-19' '2010-10-25'}}`);
  assert.equal(this.$().text(), 'true');
});

test('three args with precision (evaluatedDate, comparisonDate1, comparisonDate2, precision)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-between '2010-10-20' '2009-12-31' '2012-01-01' precision='year'}}`);
  assert.equal(this.$().text(), 'true');
});

test('three args with inclusivity (evaluatedDate, comparisonDate1, comparisonDate2, inclusivity)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-between '2016-10-30' '2016-10-30' '2016-12-30' inclusivity='[)'}}`);
  assert.equal(this.$().text(), 'true');
});

test('three args with precision and inclusivity (evaluatedDate, comparisonDate1, comparisonDate2, precision, inclusivity)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-between '2016-10-30' '2016-10-30' '2017-12-30' precision='year' inclusivity='[]'}}`);
  assert.equal(this.$().text(), 'true');
});

test('can be called with null when allow-empty is set to true', function(assert) {
  assert.expect(1);

  this.set('date', null);
  this.render(hbs`{{is-between null null allow-empty=true}}`);
  assert.equal(this.$().text(), '');
});
