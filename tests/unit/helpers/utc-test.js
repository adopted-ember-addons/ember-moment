import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

let utc = moment.utc;

moduleForComponent('utc', {
  integration: true,
  beforeEach() {
    this.container.lookup('service:moment').changeLocale('en');
  },
  afterEach() {
    moment.utc = utc;
    self.moment.utc = utc;
  }
});

test('returns the result of moment.utc', function(assert) {
  assert.expect(1);

  const timeStr = '2001-10-31T13:24:56';
  const fmtStr = 'YYYY-MM-DDTHH:mm:ss';
  const momentService = this.container.lookup('service:moment');
  const current = momentService.utc(timeStr, fmtStr);
  moment.utc = () => current;
  this.render(hbs`{{moment-format (utc) 'YYYY-MM-DDTHH:mm:ss'}}`);
  assert.equal(this.$().text(), timeStr);
});

test('returns the result of self.moment.utc', function(assert) {
  assert.expect(1);

  const timeStr = '2001-10-31T13:24:56';
  const fmtStr = 'YYYY-MM-DDTHH:mm:ss';
  const momentService = this.container.lookup('service:moment');
  const current = momentService.utc(timeStr, fmtStr);
  self.moment.utc = () => current;
  this.render(hbs`{{moment-format (utc) 'YYYY-MM-DDTHH:mm:ss'}}`);
  assert.equal(this.$().text(), timeStr);
});

test('utc of existing moment', function(assert) {
  assert.expect(2);

  const utcTimeStr = '2001-10-31T13:24:56 +00:00';
  const estTimeStr = '2001-10-31T08:24:56 -05:00';
  const fmtStr = 'YYYY-MM-DDTHH:mm:ss Z';
  const momentService = this.container.lookup('service:moment');
  const estValue = momentService.moment(estTimeStr, fmtStr);
  this.set('estValue', estValue);
  const utcValue = momentService.utc(utcTimeStr, fmtStr);
  this.set('utcValue', utcValue);
  this.render(hbs`{{moment-format (utc estValue) 'YYYY-MM-DDTHH:mm:ss Z'}}`);
  assert.equal(this.$().text(), utcTimeStr);

  this.render(hbs`{{moment-format (utc utcValue) 'YYYY-MM-DDTHH:mm:ss Z'}}`);
  assert.equal(this.$().text(), utcTimeStr);
});
