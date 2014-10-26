import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function (controller, model) {
    this._super(controller, model);

    setInterval(function () {
      Ember.run(function () {
        controller.set('date', new Date());
      });
    }, 1000);
  }
});
