import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

let originalNow;

moduleForComponent('now', {
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
    originalNow = moment.now;
  },
  afterEach() {
    moment.now = originalNow;
  }
});

test('returns the result of moment.now', function(assert) {
  assert.expect(1);

  moment.now = () => moment('20111031');
  this.render(hbs`{{moment-format (now) 'YYYYMMDD'}}`);
  assert.equal(this.$().text(), '20111031');
});
