import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('moment', {
  integration: true,
  beforeEach() {
    this.momentService = this.container.lookup('service:moment');
    this.momentService.changeLocale('en');
  }
});

test('moment-from and moment integration', function(assert) {
  assert.expect(1);

  this.set('tomorrow', moment().add(1, 'day'));

  this.render(hbs`{{moment-from (moment) tomorrow}}`);
  assert.equal(this.$().text(), 'a day ago');
});

test('moment-from and moment integration', function(assert) {
  assert.expect(1);

  this.set('tomorrow', moment().add(1, 'day'));

  this.render(hbs`{{moment-to (moment) tomorrow}}`);
  assert.equal(this.$().text(), 'in a day');
});

test('moment and monent-format helper integration #2', function(assert) {
  assert.expect(1);

  this.setProperties({
    inputFormat: 'M/D/YY',
    outputFormat: 'MMMM D, YYYY',
    date: '5/3/10'
  });

  this.render(hbs`{{moment-format (moment date inputFormat) outputFormat}}`);
  assert.equal(this.$().text(), 'May 3, 2010');
});

test('moment can use the global locale', function(assert) {
  assert.expect(1);

  this.setProperties({
    inputFormat: 'M/D/YY',
    outputFormat: 'MMMM D, YYYY',
    date: '5/3/10'
  });

  this.momentService.changeLocale('fr');
  this.render(hbs`{{moment-format (moment date inputFormat) outputFormat}}`);
  assert.equal(this.$().text(), 'mai 3, 2010');
});
