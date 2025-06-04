import { action, set } from '@ember/object';
import { dependentKeyCompat } from '@ember/object/compat';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class Index extends Controller {
  @service moment;

  @action
  changeLocale(locale) {
    this.moment.changeLocale(locale);
  }
  @action
  changeDefaultFormat(defaultFormat) {
    set(this, 'moment.defaultFormat', defaultFormat);
  }

  @tracked emptyDate = null;
  @tracked numHours = 822;
  @tracked unixTimeStamp = 946684799;
  @tracked date = new Date();
  @tracked currentTime = new Date();

  get inTwelveHours() {
    return new Date(new Date().valueOf() + 12 * 60 * 60 * 1000);
  }

  @dependentKeyCompat
  get lastHour() {
    return new Date(new Date().valueOf() - 60 * 60 * 1000);
  }

  get usIndependenceDay() {
    return new Date(1776, 6, 4, 12, 0, 0);
  }
}
