import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Application extends Route {
  @service moment;

  beforeModel() {
    this.moment.changeLocale('en');
  }
}
