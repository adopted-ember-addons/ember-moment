import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('is-same',{
  integration: true
});

test('one arg (comparisonDate)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-same '2011-10-19'}}`);
  assert.equal(this.$().text(), 'false');
});

test('one arg with precision (comparisonDate, precision)', function(assert) {
  assert.expect(1);

  const today = new Date();
  const date = `${today.getFullYear()}-10-19`;
  const context = Ember.Object.create({
    date: date
  });
  this.set('context', context);

  this.render(hbs`{{is-same context.date precision='year'}}`);
  assert.equal(this.$().text(), 'true');
});

test('two args (evaluatedDate, comparisonDate)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-same '2010-10-20' '2010-10-20'}}`);
  assert.equal(this.$().text(), 'true');
});

test('two args with precision (evaluatedDate, comparisonDate, precision)', function(assert) {
  assert.expect(1);

  this.render(hbs`{{is-same '2010-10-20' '2010-12-19' precision='year'}}`);
  assert.equal(this.$().text(), 'true');
});

test('can be called with null when allow-empty is set to true', function(assert) {
  assert.expect(1);

  this.set('date', null);
  this.render(hbs`{{is-same null allow-empty=true}}`);
  assert.equal(this.$().text(), '');
});
