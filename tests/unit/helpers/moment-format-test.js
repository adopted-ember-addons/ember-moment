import Ember from 'ember';
import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

import date from '../../helpers/date';

moduleForComponent('moment-format', {
  integration: true,
  beforeEach() {
    moment.locale('en');
  }
});

test('one arg (date)', function(assert) {
  assert.expect(1);

  this.set('date', date(date(0)));
  this.render(hbs`{{moment-format date}}`);
  assert.equal(this.$().text(), 'Wednesday, December 31, 1969 7:00 PM');
});

test('updating default format recomputes moment-format', function(assert) {
  assert.expect(2);

  this.set('date', date(date(0)));
  this.render(hbs`{{moment-format date}}`);

  const service = this.container.lookup('service:moment');

  assert.equal(this.$().text(), 'Wednesday, December 31, 1969 7:00 PM');

  Ember.run(() => {
    service.set('defaultFormat', 'DD.MM.YYYY');
    Ember.run.scheduleOnce('afterRender', () => {
      assert.equal(this.$().text(), '31.12.1969');
    });
  });
});

test('two args (date, inputFormat)', function(assert) {
  assert.expect(1);

  this.setProperties({
    format: 'MMMM D, YYYY',
    date: date(Date.parse('2011-10-10T14:48:00-05:00'))
  });

  this.render(hbs`{{moment-format date format}}`);
  assert.equal(this.$().text(), 'October 10, 2011');
});

test('three args (date, outputFormat, inputFormat)', function(assert) {
  assert.expect(1);

  this.setProperties({
    inputFormat: 'M/D/YY',
    outputFormat: 'MMMM D, YYYY',
    date: '5/3/10'
  });

  this.render(hbs`{{moment-format date outputFormat inputFormat}}`);
  assert.equal(this.$().text(), 'May 3, 2010');
});

test('change date input and change is reflected by bound helper', function(assert) {
  assert.expect(2);

  const context = Ember.Object.create({
    date: date(0)
  });

  this.set('context', context);

  this.render(hbs`{{moment-format context.date}}`);
  assert.equal(this.$().text(), 'Wednesday, December 31, 1969 7:00 PM');

  Ember.run(function () {
    context.set('date', date(60*60*24));
  });

  assert.equal(this.$().text(), 'Wednesday, December 31, 1969 7:01 PM');

});

test('can inline a locale instead of using global locale', function(assert) {
  assert.expect(1);
  this.set('date', date(date(0)));

  this.render(hbs`{{moment-format date 'LLLL' locale='es'}}`);
  assert.equal(this.$().text(), 'miércoles, 31 de diciembre de 1969 19:00');
});

test('can inline timeZone (New York)', function(assert) {
  assert.expect(1);

  this.set('date', 0);
  this.render(hbs`{{moment-format date 'LLLL' timeZone='America/New_York'}}`);
  assert.equal(this.$().text(), 'Wednesday, December 31, 1969 7:00 PM');
});

test('can inline timeZone (Los Angeles)', function(assert) {
  assert.expect(1);

  this.set('date', 0);
  this.render(hbs`{{moment-format date 'LLLL' timeZone='America/Los_Angeles'}}`);
  assert.equal(this.$().text(), 'Wednesday, December 31, 1969 4:00 PM');
});

test('can be called with null when allow-empty is set to true', function(assert) {
  assert.expect(1);

  this.set('date', null);
  this.render(hbs`{{moment-format null allow-empty=true}}`);
  assert.equal(this.$().text(), '');
});

test('can be called using subexpression', function(assert) {
  assert.expect(1);

  this.registry.register('helper:get-format', Ember.Helper.helper(function() {
    return 'L';
  }));

  this.set('date', date(0));
  this.render(hbs`{{moment-format date (get-format 'global-format')}}`);
  assert.equal(this.$().text(), '12/31/1969');
});
