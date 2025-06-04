import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { set } from '@ember/object';
import { run } from '@ember/runloop';

export default class Index extends Route {
  @service moment;

  beforeModel() {
    set(this, 'moment.locale', 'en');
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    setInterval(function () {
      run(function () {
        controller.set('date', new Date());
      });
    }, 1000);
  }
}
