import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  setupController: function (controller, model) {
    moment.locale('en');
    return this._super(controller, model);
  }
});
