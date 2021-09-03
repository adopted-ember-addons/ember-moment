import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { run } from '@ember/runloop';

export default Route.extend({
  moment: service(),

  beforeModel() {
    set(this, 'moment.locale', 'en');
  },

  setupController(controller, model) {
    this._super(controller, model);

    setInterval(function () {
      run(function () {
        controller.set('date', new Date());
      });
    }, 1000);
  },
});
