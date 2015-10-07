import Ember from 'ember';

export default Ember.Route.extend({
  moment: Ember.inject.service(),

  beforeModel() {
    this.set('moment.locale', 'en');
  },

  setupController(controller, model) {
    this._super(controller, model);

    setInterval(function () {
      Ember.run(function () {
        controller.set('date', new Date());
      });
    }, 1000);
  }
});
