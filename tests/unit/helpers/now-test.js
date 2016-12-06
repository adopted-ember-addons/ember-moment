/* globals self */
import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

let now = moment.now;

moduleForComponent('now', {
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
  },
  afterEach() {
    moment.now = now;
    self.moment.now = now;
  }
});

test('returns the result of moment.now', function(assert) {
  assert.expect(1);

  const current = moment('20111031');
  moment.now = () => current;
  this.render(hbs`{{moment-format (now) 'YYYYMMDD'}}`);
  assert.equal(this.$().text(), '20111031');
});

test('returns the result of self.moment.now', function(assert) {
  assert.expect(1);

  const current = moment('20011031');
  self.moment.now = () => current;
  this.render(hbs`{{moment-format (now) 'YYYYMMDD'}}`);
  assert.equal(this.$().text(), '20011031');
});
