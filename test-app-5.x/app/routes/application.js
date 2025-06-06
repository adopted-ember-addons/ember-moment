import Route from '@ember/routing/route';
import * as emberService from '@ember/service';

const service = emberService.service ?? emberService.inject;

export default class Application extends Route {
  @service moment;

  beforeModel() {
    this.moment.changeLocale('en');
  }
}
