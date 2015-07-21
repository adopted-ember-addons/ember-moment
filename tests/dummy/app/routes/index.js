import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  setupController: function (controller, model) {
    moment.locale('en');
    this._super(controller, model);

    setInterval(function () {
      Ember.run(function () {
        controller.set('date', new Date());
      });
    }, 1000);
  }
});
