import Ember from 'ember';
import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('moment-from-now',{
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
  }
});

test('one arg (date)', function(assert) {
  assert.expect(1);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const context = Ember.Object.create({
    date: threeDaysAgo
  });

  this.set('context', context);

  this.render(hbs`{{moment-from-now context.date}}`);
  assert.equal(this.$().text(), '3 days ago');
});

test('two args (date, inputFormat)', function(assert) {
  assert.expect(1);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  this.setProperties({
    inputFormat: 'LLLL',
    date: threeDaysAgo
  });

  this.render(hbs`{{moment-from-now date inputFormat}}`);
  assert.equal(this.$().text(), '3 days ago');
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);

  const context = Ember.Object.create({
    date: moment().subtract(1, 'hour'),
  });

  this.set('context', context);

  this.render(hbs`{{moment-from-now context.date}}`);
  assert.equal(this.$().text(), 'an hour ago');

  Ember.run(function () {
    context.set('date', moment().subtract(2, 'hours'));
  });

  assert.equal(this.$().text(), '2 hours ago');
});

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);

  this.set('date', moment().subtract(1, 'hour'));
  this.render(hbs`{{moment-from-now date locale='es'}}`);
  assert.equal(this.$().text(), 'hace una hora');
});

test('can be called with null', function(assert) {
  assert.expect(1);

  this.set('date', null);
  this.render(hbs`{{moment-from-now date allow-empty=true}}`);
  assert.equal(this.$().text(), '');
});
