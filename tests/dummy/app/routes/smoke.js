import Route from '@ember/routing/route';
import moment from 'moment';

export default class Smoke extends Route {
  setupController(controller, model) {
    moment.locale('en');
    return super.setupController(controller, model);
  }
}
